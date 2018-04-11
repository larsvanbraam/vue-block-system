import hljs from 'highlight.js';
import AbstractBlockComponent from '../../../../src/lib/mixin/AbstractBlockComponent';
import VueTypes from 'vue-types';
import DummyButton from '../../component/button/DummyButton';
import DummyBlockAData from './DummyBlockAData';
import DummyBlockATransitionController from './DummyBlockATransitionController';

export default {
  name: 'DummyBlockA',
  extends: AbstractBlockComponent,
  props: {
    data: VueTypes.shape(DummyBlockAData),
  },
  components: {
    DummyButton,
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new DummyBlockATransitionController(this);
      this.$el.querySelectorAll('pre').forEach(code => hljs.highlightBlock(code));
      this.isReady();
    },
  },
};
