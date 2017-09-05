import VueTypes from 'vue-types';
import { ButtonType, LinkType } from 'vue-block-system';

const link = {
	label: VueTypes.string.isRequired,
	title: VueTypes.string.isRequired,
	type: VueTypes.oneOf([
		ButtonType.ACTION,
		ButtonType.LINK,
	]),
	link: VueTypes.shape({
		type: VueTypes.oneOf([
			LinkType.INTERNAL,
			LinkType.EXTERNAL,
			LinkType.EXTERNAL_BLANK,
		]).isRequired,
		target: VueTypes.string.isRequired,
	}),
};

export default {
	id: VueTypes.string.isRequired,
	heading: VueTypes.string.isRequired,
	link: VueTypes.shape(link),
};

