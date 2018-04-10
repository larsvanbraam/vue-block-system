import { AbstractTransitionComponent } from 'vue-transition-component';
import config from '../config';
import ComponentType from '../enum/ComponentType';

export default {
  name: 'AbstractComponent',
  extends: AbstractTransitionComponent,
  beforeCreate() {
    // Define the type of component
    this.componentType = ComponentType.TRANSITION_COMPONENT;
  },
  methods: {
    getParentPage() {
      let parent = this.$parent;
      let attempts = 0;

      // Try to find the first parent that is a page, have a limit of 50 so we will never enter an infinite loop!
      while (
        parent.componentType !== ComponentType.CONTENT_PAGE &&
        attempts < config.blockConfig.maxFindParentPageCount
      ) {
        attempts += 1;
        parent = parent.$parent;
      }

      return parent;
    },
    getParentBlock() {
      let parent = this.$parent;
      let attempts = 0;

      // Try to find the first parent that is a page, have a limit of 50 so we will never enter an infinite loop!
      while (
        parent.componentType !== ComponentType.BLOCK_COMPONENT &&
        attempts < config.buttonConfig.maxFindParentBlockCount
      ) {
        attempts += 1;
        parent = parent.$parent;
      }

      return parent;
    },
  },
};
