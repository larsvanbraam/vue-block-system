import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

let store = null;

const getStore = () => {
  if (!store) {
    store = new Vuex.Store({
      strict: process.env.NODE_ENV !== 'production',
    });
  }

  return store;
};

export default getStore;
