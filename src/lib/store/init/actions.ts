import axios from 'axios';
import { SET_ROUTES } from './mutations';

export default {
	setInit({ commit, getters }, url) {
		let initData = null;
		return axios.get(`init.json`)
			.then(result => (initData = result.data.data))
			// Store the routes
			.then(result => commit(SET_ROUTES, initData.routes))
			// Something went wrong!!!
			.catch(() => console.warn('[Init] Something went wrong loading the init call!'));
	},
};
