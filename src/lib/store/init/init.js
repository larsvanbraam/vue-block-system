/* eslint-disable no-param-reassign */
import axios from 'axios';
import config from '../../config';

export const SET_DATA = 'setData';
export const SET_INIT = 'setInit';

export default {
  namespaced: true,
  state: {
    landingRoute: null,
    notFoundRoute: null,
  },
  mutations: {
    [SET_DATA](state, { routes }) {
      state.landingRoute = routes.landing;
      state.notFoundRoute = routes.notFound;
    },
  },
  actions: {
    [SET_INIT]({ commit }) {
      return (
        axios
          .get(config.api.initCall)
          // Store the data
          .then(result => commit(SET_DATA, result.data.data))
          // Something went wrong!!!
          .catch(() => {
            throw new Error('[Init] Something went wrong loading the init call!');
          })
      );
    },
  },
};
