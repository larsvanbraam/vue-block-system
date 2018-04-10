import Vue from 'vue';
import App from './App';
import BlockSystem from '../../src/lib/index';
import getRouter from './util/router';
import getStore from './util/store';
import block from './block';

const router = getRouter();
const store = getStore();

// Initialize the block system plugin
Vue.use(BlockSystem, {
  store,
  block,
  config: {
    api: {
      pageCall: 'static/api/page/{page}.json',
      initCall: 'static/api/init.json',
    },
    debugLabel: {
      nestedLabels: false,
    },
  },
});

// Init new vue app
const app = new Vue({
  router,
  store,
  render: createElement => createElement(App),
});

Vue.blockSystemReady.then(() => app.$mount('#app'));
