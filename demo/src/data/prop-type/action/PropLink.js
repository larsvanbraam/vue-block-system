import VueTypes from 'vue-types';
import { ButtonType, LinkType } from 'vue-block-system';

/**
 * @param {description} label This is the label of the link
 * @param {description} title This is the title of the link
 * @param {description} type This is the type of the link
 * @param {description} link This is the link object
 * @param {description} link.type This is the type of the link
 * @param {description} link.target This is the target of the link
 */
export default {
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
