import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import BlockBarTransitionController from './BlockBarTransitionController';
import BlockBarData from './BlockBarData';

export default {
	name: 'BlockBar',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape(BlockBarData).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new BlockBarTransitionController(this);
			this.isReady();
		},
	},
};
