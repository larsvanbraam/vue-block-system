import AbstractBlockComponent from '../../../../src/lib/mixin/AbstractBlockComponent';
import VueTypes from 'vue-types';
import IntroductionBlockData from './IntroductionBlockData';
import IntroductionBlockTransitionController from './IntroductionBlockTransitionController';

export default {
  name: 'IntroductionBlock',
  extends: AbstractBlockComponent,
  props: {
    data: VueTypes.shape(IntroductionBlockData),
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new IntroductionBlockTransitionController(this);
      this.isReady();
    },
  },
};
