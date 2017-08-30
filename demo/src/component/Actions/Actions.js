import { ButtonType } from 'vue-block-system';
import VueTypes from 'vue-types';
import ButtonMain from '../button/ButtonMain/ButtonMain';

export default {
	name: 'Actions',
	props: {
		actions: VueTypes.array.isRequired,
	},
	components: {
		ButtonMain,
	},
	computed: {
		ButtonType() { return ButtonType; },
	},
};
