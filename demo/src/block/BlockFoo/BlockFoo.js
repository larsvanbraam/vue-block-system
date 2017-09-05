import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import BlockFooTransitionController from './BlockFooTransitionController';
import BlockFooData from './BlockFooData';

console.log(BlockFooData);

export default {
	name: 'BlockFoo',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(BlockFooData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BlockFooTransitionController(this);
			this.isReady();
		},
	},
};
