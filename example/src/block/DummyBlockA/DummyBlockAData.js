import VueTypes from 'vue-types';
import LinkType from '../../../../src/lib/enum/LinkType';

export default {
  theme: VueTypes.string.isRequired,
  copy: VueTypes.string.isRequired,
  cta: VueTypes.shape({
    label: VueTypes.string.isRequired,
    title: VueTypes.string.isRequired,
    target: VueTypes.string,
    type: VueTypes.oneOf([
      LinkType.INTERNAL,
      LinkType.EXTERNAL,
      LinkType.EXTERNAL_BLANK,
      LinkType.SCROLL_TO_NEXT_BLOCK,
    ]),
  }),
};
