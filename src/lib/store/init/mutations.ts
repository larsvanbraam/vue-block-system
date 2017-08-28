export const SET_DATA = 'setData';

export default {
	[SET_DATA](state, data) {
		state.routes = data.routes;
	},
};
