import axios from 'axios';
import { Promise } from 'es6-promise';
import PageLayoutHelper from '../../util/PageLayoutHelper';
import { SET_LAYOUT, SET_CACHED_LAYOUT, ADD_UNKNOWN_URL } from './mutations';
import { config } from '../../index';

export default {
	updateLayout({ commit, getters }, url) {
		// Note: without the <any> cast it will throw an error when building for npm (compile:npm) when creating the
		// definitions file (Default export of the module has or is using private name 'Promise'.)
		return <any>new Promise((resolve, reject) => {
			// Check if the layout is already in cache!
			if (getters.layoutCache[url]) {
				// Update the current UI
				commit(SET_LAYOUT, getters.layoutCache[url]);
				// Return the new blocks
				resolve(getters.blocks);
			} else {
				let layout = null;
				const gateway = config.api.axiosInstance || axios;

				gateway.get(config.api.pageCall.replace('{page}', url))
				// Parse the result to the correct format!
					.then(result => PageLayoutHelper.parse(result.data.data, url))
					// Temp store it
					.then(parsedResult => (layout = parsedResult))
					// Save the response in the cached layout object for faster retrieval
					.then(() => {
						// Cache the layout if set by the config AND the page-response does not disable the caching
						// for this specific layout.
						if (config.api.layoutCache && !layout.disableCache) {
							commit(SET_CACHED_LAYOUT, { layout, url });
						}
					})
					// Update the current UI
					.then(() => commit(SET_LAYOUT, layout))
					// Return the new blocks!
					.then(() => resolve(getters.blocks))
					// Something went wrong!!!
					.catch((error) => {
						// Save the broken URL in the store
						commit(ADD_UNKNOWN_URL, { url });
						// Notify the parent about the failure
						reject(`[UpdateLayout] Something went wrong updating the layout: ${error}`);
					});
			}
		});
	},
};
