import { ScrollTrackerComponentManager } from 'scroll-tracker-component-manager';
import * as VueScrollTo from 'vue-scrollto/vue-scrollto';
import { mapState, mapActions } from 'vuex';
import { AbstractPageTransitionComponent } from 'vue-transition-component';
import ComponentType from '../enum/ComponentType';
import { InitNamespace } from '../store/init';
import { LayoutNamespace, LayoutActionTypes } from '../store/layout';
import config from '../config';

export default {
  name: 'AbstractContentPageController',
  extends: AbstractPageTransitionComponent,
  computed: {
    totalBlocks() {
      let blockCount = 0;
      const countBlocks = blocks => {
        Object.keys(blocks).forEach(key => {
          blockCount += 1;
          if (blocks[key].data && blocks[key].data.blocks) {
            countBlocks(blocks[key].data.blocks);
          }
        });
      };
      countBlocks(this.blocks);
      return blockCount;
    },
    ...mapState(InitNamespace, ['landingRoute', 'notFoundRoute']),
    ...mapState(LayoutNamespace, ['blocks', 'pageTitle']),
  },
  watch: {
    pageTitle(value) {
      // Update the document title based on the page title value
      if (value !== undefined) {
        document.title = value;
      }
    },
  },
  beforeCreate() {
    this.componentType = ComponentType.CONTENT_PAGE;
    // Here we keep track of the block components on the page
    this.blockComponents = {};
    // Create the scroll tracker manager
    this.scrollTrackerComponentManager = new ScrollTrackerComponentManager({
      element: '$el',
      vars: {
        enterViewThreshold: 'transitionInThreshold',
        componentId: 'componentId',
      },
      config: {
        setDebugLabel: config.debug.scrollTrackerLabel.enabled,
        debugBorderColor: config.debug.scrollTrackerLabel.style.color,
        resizeDebounce: 100,
      },
    });
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === from.path && from.hash !== to.hash) {
      next();
    } else {
      // Wait for it to be done, then trigger the route change
      next(vm => vm.handleRouteChange(to.path === '/' ? vm.landingRoute : to.path));
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path && from.hash !== to.hash) {
      this.scrollToBlockFromUrl(config.buttonConfig.scrollToNextBlockDuration);
      next();
    } else {
      Promise.all(
        config.enablePageTransitionOut
          ? Object.keys(this.blockComponents).map(key => this.blockComponents[key].transitionOut())
          : [Promise.resolve()],
      ).then(() => {
        // Empty the dom before we update the route
        this.resetLayout();
        // Wait for the DOM to be empty before updating the view
        this.$nextTick(() => {
          // The route is about to be updated so remove all the blocks from the scrollTracker
          this.scrollTrackerComponentManager.removeComponentsFromScrollTracker(
            this.blockComponents,
          );
          // Remove the block reference because they will be destroyed
          this.blockComponents = {};
          // Route update should be done right away!
          this.handleRouteChange(to.path)
            .then(() => next())
            .catch(() => {
              throw new Error(
                '[AbstractContentPageComponent] Something broke after the route update',
              );
            });
        });
      });
    }
  },
  methods: {
    ...mapActions({
      updateLayout: LayoutActionTypes.UPDATE_LAYOUT,
      resetLayout: LayoutActionTypes.RESET_LAYOUT,
    }),
    handleBlockComponentReady(component) {
      // Register the new block
      this.blockComponents[component.componentId] = component;
      // Check if all blocks are ready
      if (Object.keys(this.blockComponents).length === this.totalBlocks) {
        console.log('add points', this.blockComponents);
        // When all components are ready we start adding the blocks to the scroll tracker
        this.scrollTrackerComponentManager.addComponentsToScrollTrackers(this.blockComponents);
        // All blocks loaded so check if we need to scroll to the hash from the url
        this.scrollToBlockFromUrl(1, 1000);
      }
    },
    handleRouteChange(route) {
      return this.updateLayout(route)
        .then(() => this.handleRouteChangeComplete())
        .catch(() => {
          if (this.notFoundRoute === this.$router.currentRoute.path) {
            this.handleRouteChange(this.notFoundRoute);
          } else {
            this.$router.push(this.notFoundRoute);
          }
        });
    },
    handleRouteChangeComplete() {
      // Nothing by default
    },
    scrollToBlockFromUrl(scrollDuration, scrollTimeout) {
      return new Promise(resolve => {
        if (window.location.hash) {
          let foundComponent = false;
          Object.keys(this.blockComponents).forEach(key => {
            if (this.blockComponents[key].data.scrollId === window.location.hash.slice(1)) {
              // Mark as found
              foundComponent = true;

              // Use the scroll plugin to change the scroll position to the desired element!
              setTimeout(() => {
                VueScrollTo.scrollTo(this.blockComponents[key].$el, scrollDuration, {
                  cancelable: true,
                  offset: config.buttonConfig.scrollToNextBlockOffset,
                  onDone: resolve,
                  onCancel: resolve,
                });
              }, scrollTimeout || 0);
            }
          });

          // Scroll section is not  found, so resolve anyway
          if (!foundComponent) {
            resolve();
          }
        } else {
          resolve();
        }
      });
    },
  },
  beforeDestroy() {
    if (this.scrollTrackerComponentManager) {
      this.scrollTrackerComponentManager.removeComponentsFromScrollTracker(this.blockComponents);
      this.scrollTrackerComponentManager.dispose();
      this.scrollTracker = null;
    }

    if (this.blockComponents) {
      this.blockComponents = null;
    }
  },
};
