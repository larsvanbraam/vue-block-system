import axios from 'axios';
import { Promise } from 'es6-promise';
import PageLayoutHelper from '../../util/PageLayoutHelper';
import { SET_LAYOUT, SET_CACHED_LAYOUT, ADD_UNKNOWN_URL } from './mutations';

export default {
	updateLayout({ commit, getters }, url) {
		return new Promise((resolve, reject) => {
			// Check if the layout is already in cache!
			if (getters.layoutCache[url]) {
				// Update the current UI
				commit(SET_LAYOUT, getters.layoutCache[url]);
				// Return the new blocks
				resolve(getters.blocks);
			} else {
				let layout = null;
				axios.get(`page${url}`)
					// Parse the result to the correct format!
					.then(result => PageLayoutHelper.parse(result.data.data, url))
					// Temp store it
					.then(parsedResult => (layout = parsedResult))
					// Save the response in the cached layout object for faster retrieval
					.then(() => commit(SET_CACHED_LAYOUT, { layout, url }))
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