import VueTypes from 'vue-types';
import PropLink from '../../data/prop-type/action/PropLink';

/**
 * @param {description} heading This is the heading of the component
 * @param {description} link this is the link object of the component
 */
export default {
	heading: VueTypes.string.isRequired,
	link: VueTypes.shape(PropLink),
};
