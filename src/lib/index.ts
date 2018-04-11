import merge from 'lodash/merge';
import config from './config';
import init, { InitActionTypes, InitNamespace } from './store/init';
import layout, { LayoutNamespace } from './store/layout';
import BlockHelper from './util/BlockHelper';

export default {
  install(Vue, options) {
    // Create a promise so we know the entire plugin is ready
    Vue.blockSystemReady = new Promise((resolve, reject) => {
      // Modify the merge hook for the router so we enable childToParent merging
      Vue.config.optionMergeStrategies.beforeRouteUpdate = (parent, child) => {
        return child
          ? parent ? [child].concat(parent) : Array.isArray(child) ? child : [child]
          : parent;
      };

      // register all block components globally
      Object.keys(options.block).forEach(key => Vue.component(key, options.block[key]));

      // Merge the configuration
      if (options.config) {
        merge(config, options.config);
      }

      // Create the stores
      options.store.registerModule(InitNamespace, init);
      options.store.registerModule(LayoutNamespace, layout);

      // Store the available blocks so we can validate backend responses
      BlockHelper.availableBlocks = Object.keys(options.block);

      // Set the init
      options.store
        .dispatch(InitActionTypes.SET_INIT)
        .then(resolve)
        .catch(reject);
    });
  },
};
