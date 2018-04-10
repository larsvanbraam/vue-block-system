import { AbstractTransitionComponent } from 'vue-transition-component';
import { TweenLite } from 'gsap';
import VueTypes from 'vue-types';
import config from '../config';
import BlockSystemComponentType from '../enum/BlockSystemComponentType';

export const blockComponentType = 'BlockComponent';

export default {
  name: 'AbstractBlockComponent',
  extends: AbstractTransitionComponent,
  props: {
    data: VueTypes.object.isRequired,
    debugLabel: VueTypes.boolean,
    transitionInThreshold: VueTypes.number.def(0.25),
  },
  data() {
    return {
      inView: false,
    };
  },
  beforeCreate() {
    this.$_blockSystemComponentType = BlockSystemComponentType.BLOCK_COMPONENT;
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
      while (
        parent.$_blockSystemComponentType !== BlockSystemComponentType.CONTENT_PAGE &&
        attempts < config.blockConfig.maxFindParentPageCount
      ) {
        attempts += 1;
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
      if (config.debugLabel.nestedLabels) {
        while (parent && parent.$_isRegistrable) {
          breadCrumbs = `${parent.$_componentId} » ${breadCrumbs}`;
          parent = parent.$parent;
        }
      }
      debugLabel.innerHTML = breadCrumbs + this.$_componentId;
      TweenLite.set(debugLabel, config.debugLabel.style);
      this.$el.appendChild(debugLabel);
    },
  },
  mounted() {
    if (this.debugLabel) {
      this.addDebugLabel();
    }
  },
};
