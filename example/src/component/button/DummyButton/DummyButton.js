import VueTypes from 'vue-types';
import AbstractButtonComponent from '../../../../../src/lib/mixin/AbstractButtonComponent';
import DummyButtonTransitionController from './DummyButtonTransitionController';

export default {
  name: 'DummyButton',
  extends: AbstractButtonComponent,
  props: {
  	theme: VueTypes.string.def('primary'),
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyButtonTransitionController(this);
      this.isReady();
    },
  },
};
