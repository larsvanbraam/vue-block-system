import { AbstractBlockComponent } from 'vue-block-system';
import BlockFooTransitionController from './BlockFooTransitionController';

export default {
	name: 'BlockFoo',
	extends: AbstractBlockComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BlockFooTransitionController(this);
			this.isReady();
		},
	},
};
