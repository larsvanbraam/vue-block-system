import { debounce } from 'lodash';
import { Promise } from 'es6-promise';
import ScrollTracker, { ScrollTrackerEvent } from 'seng-scroll-tracker';
import VueScrollTo from 'vue-scrollto/vue-scrollto';
import { AbstractPageTransitionComponent } from 'vue-transition-component';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import { InitNamespace } from '../store/init';
import { LayoutNamespace } from '../store/layout/index';
import config from '../config';

export default {
	name: 'AbstractContentPageController',
	extends: AbstractPageTransitionComponent,
	computed: {
		totalBlocks() {
			let blockCount = 0;
			const countBlocks = (blocks) => {
				Object.keys(blocks).forEach((key) => {
					++blockCount;
					if (blocks[key].data && blocks[key].data.blocks) {
						countBlocks(blocks[key].data.blocks);
					}
				});
			};
			countBlocks(this.blocks);
			return blockCount;
		},
		...mapState(LayoutNamespace, ['blocks', 'pageTitle']),
		...mapGetters(InitNamespace, ['landingRoute', 'notFoundRoute']),
	},
	watch: {
		pageTitle(value) {
			// Update the document title based on the page title value
			document.title = value;
		},
	},
	beforeCreate() {
		/**
		 * @public
		 * @property blockComponents
		 * @description Here we keep track of the block components on the page
		 * @type {{}}
		 */
		this.blockComponents = {};
		/**
		 * @public
		 * @property scrollTrackerPoints
		 * @description Here we keep track of the scrollTracker points on this page
		 * @type {{}}
		 */
		this.scrollTrackerPoints = {};
		/**
		 * @public
		 * @property scrollTracker
		 * @description Here initiate the scrollTracker, the scrollTracker manages when a component is in view or
		 * when it's not!
		 */
		this.scrollTracker = new ScrollTracker();
	},
	mounted() {
		// Store the listeners for removal
		this.resizeListener = debounce(this.handleResize, 500);
		// Bind events
		window.addEventListener('resize', this.resizeListener);
	},
	/**
	 * @public
	 * @method beforeEnter
	 * @description When the page is initialized the beforeRouteEnter event is triggered, this will setup the page
	 * on initial load
	 * @param to
	 * @param from
	 * @param next
	 */
	beforeRouteEnter(to, from, next) {
		// Wait for it to be done, then trigger the route change
		next(vm => vm.handleRouteChange(to.path === '/' ? vm.landingRoute : to.path));
	},
	/**
	 * @public
	 * @method beforeRouteUpdate
	 * @description When the page changes after initial load the beforeRouteUpdate is triggered, this will update
	 * the layout to the new page!
	 * @param to
	 * @param from
	 * @param next
	 */
	beforeRouteUpdate(to, from, next) {
		Promise.all(
			config.enablePageTransitionOut ? Object.keys(this.blockComponents).map(
				key => this.blockComponents[key].transitionOut()) : [Promise.resolve()],
		)
		.then(() => {
			// Empty the dom before we update the route
			this.setLayout({ blocks: [], pageTitle: '', id: '' });

			// Wait for the DOM to be empty before updating the view
			this.$nextTick(() => {
				// The route is about to be updated so remove all the blocks from the scrollTracker
				this.removeBlocksFromScrollTracker(this.blockComponents);
				// Remove the block reference because they will be destroyed
				this.blockComponents = {};
				// Route update should be done right away!
				this.handleRouteChange(to.path)
				.then(() => next())
				.catch((reason) => {
					console.error('[AbstractContentPageComponent] Something broke after the route update');
				});
			});
		});
	},
	methods: {
		...mapActions(LayoutNamespace, ['updateLayout']),
		...mapMutations(LayoutNamespace, ['setLayout']),
		/**
		 * @public
		 * @method handleBlockComponentReady
		 * @description When a block component is registered it fires a isReady event this isReady event is handled
		 * by this method it checks if all the components are loaded.
		 * @param component
		 * @param isChildBlock
		 * @returns void
		 */
		handleBlockComponentReady(component, isChildBlock) {
			// Register the new block
			this.blockComponents[component.componentId] = component;
			// Check if all blocks are ready
			if (Object.keys(this.blockComponents).length === this.totalBlocks) {
				// When all components are ready we start adding the blocks to the scroll tracker
				this.addBlocksToScrollTracker(this.blockComponents);
			}
		},
		/**
		 * @public
		 * @method handleRouteChange
		 * @description When the beforeRouteEnter or beforeRouteUpdate is triggered we fire the route change event,
		 * this will ask the store to update the layout!
		 * @param route
		 * @returns Promise<void>
		 */
		handleRouteChange(route) {
			return this.updateLayout(route)
			.then(() => this.scrollToBlockFromUrl())
			.then(() => this.handleRouteChangeComplete())
			.catch(() => {
				if (this.notFoundRoute === this.$router.currentRoute.path) {
					this.handleRouteChange(this.notFoundRout)
				} else {
					this.$router.push(this.notFoundRoute);
				}
			});
		},
		/**
		 * @public
		 * @method handleRouteChangeComplete
		 * @description When the route change is completed this method is triggered, this can be used to implement
		 * page tracking, or show page loaders.
		 * @returns void
		 */
		handleRouteChangeComplete() {
			// Nothing by default
		},
		/**
		 * @public
		 * @method scrollToBlockFromUrl
		 * @description After page is loaded we can scroll to a block based on the scrollId
		 * @returns Promise<void>
		 */
		scrollToBlockFromUrl() {
			return new Promise((resolve) => {
				if (window.location.hash) {
					Object.keys(this.blockComponents).forEach((key, index) => {
						if (this.blockComponents[key].scrollId === window.location.hash.slice(1)) {
							// Use the scroll plugin to change the scroll position to the desired element!
							VueScrollTo.scrollTo(this.blockComponents[key].$el, 1, {
								cancelable: true,
								onDone: resolve,
								onCancel: resolve,
							});
						}
					});
				} else {
					resolve();
				}
			});
		},
		/**
		 * @public
		 * @method handleBlockEnterView
		 * @param blockId
		 * @description When a block enters the view we want to trigger the transition in method and mark the block
		 * as inView
		 * @returns void
		 */
		handleBlockEnterView(blockId) {
			if (this.blockComponents[blockId]) {
				this.blockComponents[blockId].inView = true;
				this.blockComponents[blockId].transitionIn();
			}
		},
		/**
		 * @public
		 * @method handleBlockBeyondView
		 * @param blockId
		 * @description When the scrollbar is dragged down super fast the default enter view event might not be
		 * triggered therefor we have a beyondView event! If it's already transitioned in it will do nothing! But if
		 * it's not transitioned in it will still try to transitionIn
		 * @returns void
		 */
		handleBlockBeyondView(blockId) {
			if (this.blockComponents[blockId]) {
				this.blockComponents[blockId].inView = true;
				this.blockComponents[blockId].transitionIn();
			}
		},
		/**
		 * @public
		 * @method handleBlockLeaveView
		 * @description When a block leaves the view we set the inView flag to false
		 * @param blockId
		 * @returns void
		 */
		handleBlockLeaveView(blockId) {
			this.blockComponents[blockId].inView = false;
			// TODO: implement looping animations??
		},
		/**
		 * @public
		 * @method addBlocksToScrollTracker
		 * @description When we want to add new block components to the scrollTracker we can use this method to add
		 * them and let them transition in when they enter the view
		 * @param blocks
		 */
		addBlocksToScrollTracker(blocks) {
			Object.keys(blocks).forEach((blockId) => {
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
		/**
		 * @public
		 * @method removeBlocksFromScrollTracker
		 * @description When we want to remove blocks from the scroll tracker you can pass an object with the blocks
		 * you want to remove.
		 * @param blocks
		 */
		removeBlocksFromScrollTracker(blocks) {
			Object.keys(blocks).forEach((blockId) => {
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
					console.warn(
						`[AbstractContentPageComponent] Block with id: [${blockId}] does not exist, unable to remove it`,
					);
				}
			});
		},
		/**
		 * @public
		 * @method handleResize
		 * @description When the window resize event is triggered  we need to recalculate the scrollTrackerPoints so the
		 * transitionIn happens on the right moments!
		 * @returns void
		 */
		handleResize() {
			Object.keys(this.scrollTrackerPoints).forEach((blockId) => {
				const block = this.blockComponents[blockId];
				const scrollTrackerPoint = this.scrollTrackerPoints[blockId];

				const element = block.$el;
				const parent = block.$parent.$el;
				const threshold = element.offsetHeight * block.transitionInThreshold;
				const elementHeight = element.offsetHeight - threshold;

				scrollTrackerPoint.position = Math.round(parent.offsetTop + element.offsetTop + threshold);
				scrollTrackerPoint.height = elementHeight;
			});
		},
	},
	/**
	 * @public
	 * @method beforeDestroy
	 * @description When the page is destroyed we need to destroy all the instances and remove all the event listeners
	 * @returns void
	 */
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
