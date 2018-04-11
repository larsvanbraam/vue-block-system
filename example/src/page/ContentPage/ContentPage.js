import AbstractContentPageComponent from '../../../../src/lib/mixin/AbstractContentPageComponent';
import ContentPageTransitionController from './ContentPageTransitionController';

export default {
  name: 'ContentPage',
  extends: AbstractContentPageComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new ContentPageTransitionController(this);
      this.isReady();
    },
  },
};
