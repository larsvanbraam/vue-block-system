import init, { InitNamespace } from './store/init';
import layout, { LayoutNamespace } from './store/layout';
import BlockHelper from './util/BlockHelper';
import { assign } from 'lodash';

// Default settings for the debug label
export const debugLabelStyling = {
	font: '10px/1 sans-serif',
	backgroundColor: 'red',
	color: 'white',
	padding: '5px',
	position: 'absolute',
	top: '0px',
	left: '0px',
};

export default {
	install(Vue, options) {
		// register all block components globally
		Object.keys(options.block).forEach(key => Vue.component(key, options.block[key]));

		// Set the styling for the debug label
		if (options.debugLabelStyling) {
			assign(debugLabelStyling, options.debugLabelStyling)
		}

		// Create the stores
		options.store.registerModule(InitNamespace, init);
		options.store.registerModule(LayoutNamespace, layout);

		// Store the available blocks so we can validate backend responses
		BlockHelper.availableBlocks = Object.keys(options.block);
	},
};
