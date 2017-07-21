import init, { InitNamespace } from './store/init';
import layout2, { LayoutNamespace } from './store/layout';
import BlockHelper from './util/BlockHelper';
import { merge } from 'lodash';
import { Promise } from 'es6-promise';

// Global configuration object
export const config = {
	initCall: {
		url: '/api/init',
		useJsonFile: false,
	},
	pageCall: {
		url: '/api/page/',
		useJsonFile: false,
	},
	debugLabelStyling: {
		font: '10px/1 sans-serif',
		backgroundColor: 'red',
		color: 'white',
		padding: '5px',
		position: 'absolute',
		top: '0px',
		left: '0px',
	},
};

export default {
	install(Vue, options) {
		// Create a promise so we know the entire plugin is ready
		Vue.blockSystemReady = new Promise((resolve, reject) => {
			// register all block components globally
			Object.keys(options.block).forEach(key => Vue.component(key, options.block[key]));

			// Merge the configuration
			if (options.config) {
				merge(config, options.config);
			}

			// Create the stores
			options.store.registerModule(InitNamespace, init);
			options.store.registerModule(LayoutNamespace, layout2);

			// Store the available blocks so we can validate backend responses
			BlockHelper.availableBlocks = Object.keys(options.block);

			// Set the init
			options.store.dispatch(`${InitNamespace}/setInit`)
				.then(resolve)
				.catch(reject);
		});
	},
};
