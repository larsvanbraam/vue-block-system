import { AbstractBlockComponent }from 'vue-block-system';
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';

export default {
	name: '{{name_pc}}',
	extends: AbstractBlockComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new {{name_pc}}TransitionController(this);
			this.isReady();
		},
	},
};
