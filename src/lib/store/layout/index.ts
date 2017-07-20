import layout from './layout';
import { SET_LAYOUT, SET_CACHED_LAYOUT, ADD_UNKNOWN_URL } from './mutations';

export const LayoutNamespace = 'layout';

export const LayoutMutationTypes = {
	SET_LAYOUT: `${LayoutNamespace}/${SET_LAYOUT}`,
	SET_CACHED_LAYOUT: `${LayoutNamespace}/${SET_CACHED_LAYOUT}`,
	ADD_UNKNOWN_URL: `${LayoutNamespace}/${ADD_UNKNOWN_URL}`,
};

export default layout;
