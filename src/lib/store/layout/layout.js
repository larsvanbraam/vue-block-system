/* eslint-disable no-param-reassign */
import axios from 'axios';
import config from '../../config';
import PageLayoutHelper from '../../util/PageLayoutHelper';

export const SET_LAYOUT = 'setLayout';
export const SET_PAGE_URL = 'setPageUrl';
export const SET_CACHED_LAYOUT = 'setCachedLayout';
export const ADD_UNKNOWN_URL = 'addUnknownUrl';
export const UPDATE_LAYOUT = 'updateLayout';
export const RESET_LAYOUT = 'resetLayout';

export default {
  namespaced: true,
  state: {
    /**
     * @property layoutCache
     * @description A cache object to store the loaded layouts in memory for faster retrieval
     */
    layoutCache: {},
    /**
     * @property blocks
     * @description Array containing the currently displayed blocks
     */
    blocks: [],
    /**
     * @property pageTitle
     * @description The title of the current page
     */
    pageTitle: '',
    /**
     * @property pageData
     * @description Any extra data required on the page
     */
    pageData: {},
    /**
     * @property pageId
     * @description The id of the current page
     */
    pageId: '',
    /**
     * @property
     * @description The url of the current page
     */
    pageUrl: '',
    /**
     * @property
     * @description An array of urls that failed so we do not try to load it again when it fails!
     */
    unknownUrls: [],
  },
  mutations: {
    [SET_LAYOUT](state, layout) {
      state.blocks = layout.blocks;
      state.pageTitle = layout.title;
      state.pageData = layout.data;
      state.pageId = layout.pageId;
    },
    [SET_PAGE_URL](state, url) {
      state.pageUrl = url;
    },
    [SET_CACHED_LAYOUT](state, { layout, url }) {
      state.layoutCache[url] = layout;
    },
    [ADD_UNKNOWN_URL](state, { url }) {
      if (state.unknownUrls.indexOf(url) === -1) {
        state.unknownUrls.push(url);
      }
    },
  },
  actions: {
    [UPDATE_LAYOUT]({ commit, state }, sourceUrl) {
      const url = config.api.stripLeadingSlash ? sourceUrl.replace(/^\/+/g, '') : sourceUrl;
      // Note: without the <any> cast it will throw an error when building for npm (compile:npm) when creating the
      // definitions file (Default export of the module has or is using private name 'Promise'.)
      return new Promise((resolve, reject) => {
        // Check if the layout is already in cache!
        if (state.layoutCache[url]) {
          // Update the current page url
          commit(SET_PAGE_URL, url);
          // Update the current UI
          commit(SET_LAYOUT, state.layoutCache[url]);
          // Return the new blocks
          resolve(state.blocks);
        } else {
          let layout = null;
          const gateway = config.api.axiosInstance || axios;
          gateway
            .get(config.api.pageCall.replace('{page}', url))
            // Parse the result to the correct format!
            .then(result => PageLayoutHelper.parse(result.data.data, url))
            // Temp store it
            .then(parsedResult => {
              layout = parsedResult;
            })
            // Save the response in the cached layout object for faster retrieval
            .then(() => {
              // Cache the layout if set by the config AND the page-response does not disable the caching
              // for this specific layout.
              if (config.api.layoutCache && !layout.disableCache) {
                commit(SET_CACHED_LAYOUT, { layout, url });
              }
            })
            // Update the current page url
            .then(() => commit(SET_PAGE_URL, url))
            // Update the current UI
            .then(() => commit(SET_LAYOUT, layout))
            // Return the new blocks!
            .then(() => resolve(state.blocks))
            // Something went wrong!!!
            .catch(error => {
              // Save the broken URL in the store
              commit(ADD_UNKNOWN_URL, { url });
              // Notify the parent about the failure
              reject(
                new Error(`[UpdateLayout] Something went wrong updating the layout: ${error}`),
              );
            });
        }
      });
    },
    [RESET_LAYOUT]({ commit }) {
      commit(SET_LAYOUT, { blocks: [], pageTitle: '', id: '' });
    },
  },
};
