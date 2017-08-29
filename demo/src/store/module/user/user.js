export const SET_USER = 'setUser';

export default {
	namespaced: true,
	state: {
		firstName: '',
		lastName: '',
	},
	getters: {
		fullName: state => `${state.firstName} ${state.lastName}`,
	},
	mutations: {
		[SET_USER]: (state, payload) => {
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
		},
	},
	actions: {},
};
