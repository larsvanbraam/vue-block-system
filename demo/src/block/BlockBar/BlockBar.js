import { AbstractBlockComponent } from 'vue-block-system';
import BlockBarTransitionController from './BlockBarTransitionController';

export default {
	name: 'BlockBar',
	extends: AbstractBlockComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BlockBarTransitionController(this);
			this.isReady();
		},
	},
};
