import VueTypes from 'vue-types';
import { AbstractBlockComponent } from 'vue-block-system';
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';
import {{name_pc}}Data from './{{name_pc}}Data';

export default {
	name: '{{name_pc}}',
	extends: AbstractBlockComponent,
	props: {
		data: VueTypes.shape({{name_pc}}Data).isRequired,
	},
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new {{name_pc}}TransitionController(this);
			this.isReady();
		},
	},
};
