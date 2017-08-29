import { AbstractButtonComponent } from 'vue-block-system';
import ButtonMainTransitionController from './ButtonMainTransitionController';

export default {
	name: 'ButtonMain',
	extends: AbstractButtonComponent,
	methods: {
		handleAllComponentsReady() {
			this.transitionController = new ButtonMainTransitionController(this);
			this.isReady();
		},
	},
};
