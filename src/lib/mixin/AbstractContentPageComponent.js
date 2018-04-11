import debounce from 'lodash/debounce';
import ScrollTracker, { ScrollTrackerEvent } from 'seng-scroll-tracker';
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
    // Here we keep track of the scrollTracker points on this page
    this.scrollTrackerPoints = {};
    // Here initiate the scrollTracker, the scrollTracker manages when a component is in view or when it's not!
    this.scrollTracker = new ScrollTracker();
  },
  mounted() {
    // Store the listeners for removal
    this.resizeListener = debounce(this.handleResize, 500);
    // Bind events
    window.addEventListener('resize', this.resizeListener);
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
          this.removeBlocksFromScrollTracker(this.blockComponents);
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
      this.blockComponents[component.$_componentId] = component;
      // Check if all blocks are ready
      if (Object.keys(this.blockComponents).length === this.totalBlocks) {
        // When all components are ready we start adding the blocks to the scroll tracker
        this.addBlocksToScrollTracker(this.blockComponents);
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
    handleBlockEnterView(blockId) {
      if (this.blockComponents[blockId]) {
        this.blockComponents[blockId].inView = true;
        this.blockComponents[blockId].transitionIn();
      }
    },
    handleBlockBeyondView(blockId) {
      if (this.blockComponents[blockId]) {
        this.blockComponents[blockId].inView = true;
        this.blockComponents[blockId].transitionIn();
      }
    },
    handleBlockLeaveView(blockId) {
      this.blockComponents[blockId].inView = false;
      // TODO: implement looping animations??
    },
    addBlocksToScrollTracker(blocks) {
      Object.keys(blocks).forEach(blockId => {
        // The block is already added to the blocks object
        const block = this.blockComponents[blockId];

        // Check if it's not already added!
        if (!this.scrollTrackerPoints[blockId]) {
          const element = block.$el;
          const threshold = window.innerHeight * block.transitionInThreshold;
          const parent = block.$parent.$el;
          const yPosition = Math.round(parent.offsetTop + element.offsetTop + threshold);
          const elementHeight = element.offsetHeight - threshold;
          const scrollTrackerPoint = this.scrollTracker.addPoint(yPosition, elementHeight);

          // Store the reference
          this.scrollTrackerPoints[blockId] = {
            point: scrollTrackerPoint,
            enterViewListener: this.handleBlockEnterView.bind(this, blockId),
            leaveViewListener: this.handleBlockLeaveView.bind(this, blockId),
            beyondViewListener: this.handleBlockBeyondView.bind(this, blockId),
          };

          scrollTrackerPoint.addEventListener(
            ScrollTrackerEvent.ENTER_VIEW,
            this.scrollTrackerPoints[blockId].enterViewListener,
          );
          scrollTrackerPoint.addEventListener(
            ScrollTrackerEvent.LEAVE_VIEW,
            this.scrollTrackerPoints[blockId].leaveViewListener,
          );
          scrollTrackerPoint.addEventListener(
            ScrollTrackerEvent.SCROLLED_BEYOND,
            this.scrollTrackerPoints[blockId].beyondViewListener,
          );

          // Check for the position on init
          if (scrollTrackerPoint.isInBounds) {
            this.handleBlockEnterView(blockId);
          }
        }
      });
    },
    removeBlocksFromScrollTracker(blocks) {
      Object.keys(blocks).forEach(blockId => {
        const scrollTrackerPoint = this.scrollTrackerPoints[blockId];

        if (scrollTrackerPoint) {
          scrollTrackerPoint.point.removeEventListener(
            ScrollTrackerEvent.ENTER_VIEW,
            scrollTrackerPoint.enterViewListener,
          );
          scrollTrackerPoint.point.removeEventListener(
            ScrollTrackerEvent.LEAVE_VIEW,
            scrollTrackerPoint.leaveViewListener,
          );
          scrollTrackerPoint.point.removeEventListener(
            ScrollTrackerEvent.SCROLLED_BEYOND,
            scrollTrackerPoint.beyondViewListener,
          );

          // Remove the point from the scroll tracker
          this.scrollTracker.removePoint(scrollTrackerPoint.point);
          // Remove the point from the object
          delete this.scrollTrackerPoints[blockId];
          // Remove the block reference
          delete this.blockComponents[blockId];
        } else {
          throw new Error(
            `[AbstractContentPageComponent] Block with id: [${blockId}] does not exist, unable to remove it`,
          );
        }
      });
    },
    handleResize() {
      Object.keys(this.scrollTrackerPoints).forEach(blockId => {
        const block = this.blockComponents[blockId];
        const scrollTrackerPoint = this.scrollTrackerPoints[blockId].point;

        const element = block.$el;
        const parent = block.$parent.$el;
        const threshold = element.offsetHeight * block.transitionInThreshold;
        const elementHeight = element.offsetHeight - threshold;

        scrollTrackerPoint.position = Math.round(parent.offsetTop + element.offsetTop + threshold);
        scrollTrackerPoint.height = elementHeight;
      });
    },
  },
  beforeDestroy() {
    if (this.blockComponents) {
      this.removeBlocksFromScrollTracker(this.blockComponents);
      this.blockComponents = null;
    }

    if (this.scrollTracker) {
      this.scrollTracker.dispose();
      this.scrollTracker = null;
    }

    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      this.resizeListener = null;
    }
  },
};
