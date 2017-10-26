import axios from 'axios';
import { SET_DATA } from './mutations';
import config from '../../config';

export default {
	setInit({ commit, getters }, url) {
		return axios.get(config.api.initCall)
			// Store the data
			.then(result => commit(SET_DATA, result.data.data))
			// Something went wrong!!!
			.catch(() => console.warn('[Init] Something went wrong loading the init call!'));
	},
};
