import { TweenLite } from 'gsap';
import VueTypes from 'vue-types';
import config from '../config';
import ComponentType from '../enum/ComponentType';
import AbstractComponent from './AbstractComponent';

export default {
  name: 'AbstractBlockComponent',
  extends: AbstractComponent,
  props: {
    data: VueTypes.object.isRequired,
    debugLabel: VueTypes.bool.def(false),
    transitionInThreshold: VueTypes.number.def(0.25),
  },
  data() {
    return {
      inView: false,
    };
  },
  beforeCreate() {
    this.componentType = ComponentType.BLOCK_COMPONENT;
  },
  methods: {
    handleBlockComponentReady(component) {
      // Bubble up to the parent page
      this.getParentPage().handleBlockComponentReady(component);
    },
    addDebugLabel() {
      const debugLabel = document.createElement('div');
      let breadCrumbs = '';
      let parent = this.$parent;
      while (
        parent &&
        parent.componentType === ComponentType.CONTENT_PAGE &&
        config.debugLabel.nestedLabels
      ) {
        breadCrumbs = `${parent.componentId} » ${breadCrumbs}`;
        parent = parent.$parent;
      }
      debugLabel.innerHTML = breadCrumbs + this.componentId;
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
