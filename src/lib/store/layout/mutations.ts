import { assign } from 'lodash';

export const SET_LAYOUT = 'setLayout';
export const SET_PAGE_URL = 'setPageUrl';
export const SET_CACHED_LAYOUT = 'setCachedLayout';
export const ADD_UNKNOWN_URL = 'addUnknownUrl';

export default {
	[SET_LAYOUT](state, layout) {
		state.blocks = assign({}, state.blocks, layout.blocks);
		state.pageTitle = layout.title;
		state.pageData = assign({}, state.pageData, layout.data);
		state.pageId = layout.pageId;
	},
	[SET_PAGE_URL](state, url) {
		state.pageUrl = url
	},
	[SET_CACHED_LAYOUT](state, { layout, url }) {
		state.layoutCache[url] = layout;
	},
	[ADD_UNKNOWN_URL](state, { url }) {
		if (state.unknownUrls.indexOf(url) === -1) {
			state.unknownUrls.push(url);
		}
	},
};
