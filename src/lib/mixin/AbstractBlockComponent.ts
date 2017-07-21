import { TweenLite } from 'gsap';
import { debugLabelStyling } from '../index';
import { AbstractTransitionComponent, ComponentType } from 'vue-transition-component';

export default {
	name: 'AbstractBlockComponent',
	extends: AbstractTransitionComponent,
	props: {
		data: {
			type: Object,
			default: () => {},
			required: false,
		},
		debugLabel: {
			type: Boolean,
			default: false,
			required: false,
		},
		scrollId: {
			type: String,
			required: false,
		},
		transitionInThreshold: {
			type: Number,
			default: 0.25,
		},
	},
	data() {
		return {
			inView: false,
		};
	},
	methods: {
		/**
		 * @public
		 * @description this contains the first parent that is a page
		 * @returns {Vue}
		 */
		getParentPage() {
			let parent = this.$parent;
			let attempts = 0;

			// Try to find the first parent that is a page, have a limit of 50 so we will never enter an infinite loop!
			while (parent.componentType !== ComponentType.PAGE_COMPONENT && attempts < 50) {
				++attempts;
				parent = parent.$parent;
			}

			return parent;
		},
		/**
		 * @public
		 * @method handleBlockComponentReady
		 * @description When a block component is registered it fires a isReady event this isReady event is handled
		 * by this method it checks if all the components are loaded.
		 * @param component
		 * @returns void
		 */
		handleBlockComponentReady(component) {
			// Bubble up to the parent page
			this.getParentPage().handleBlockComponentReady(component);
		},
		/**
		 * @public
		 * @method
		 * @description Method that adds the debug label to the component, should be disabled on a production build
		 * though!
		 * @returns void
		 */
		addDebugLabel() {
			const debugLabel = document.createElement('div');
			let breadCrumbs = '';
			let parent = this.$parent;
			while (parent && parent.componentType !== ComponentType.PAGE_COMPONENT) {
				breadCrumbs = `${this.$parent.componentId} » ${breadCrumbs}`;
				parent = parent.$parent;
			}
			debugLabel.innerHTML = breadCrumbs + this.componentId;
			TweenLite.set(debugLabel, debugLabelStyling);
			this.$el.appendChild(debugLabel);
		},
	},
	mounted() {
		if (this.debugLabel) {
			this.addDebugLabel();
		}
	},
};
