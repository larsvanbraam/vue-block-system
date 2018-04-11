import VueTypes from 'vue-types';
import * as VueScrollTo from 'vue-scrollto/vue-scrollto';
import { AbstractTransitionComponent } from 'vue-transition-component';
import LinkType from '../enum/LinkType';
import ButtonType from '../enum/ButtonType';
import customButtonEventDispatcher from '../util/CustomButtonEventDispatcher';
import CustomButtonEvent from '../event/CustomButtonEvent';
import config from '../config';

export default {
  name: 'AbstractButtonComponent',
  extends: AbstractTransitionComponent,
  props: {
    label: VueTypes.string,
    title: VueTypes.string.isRequired,
    type: VueTypes.oneOf([ButtonType.ACTION, ButtonType.LINK]).isRequired,
    link: VueTypes.shape({
      type: VueTypes.any.isRequired,
      target: VueTypes.any,
    }),
  },
  beforeCreate() {
    this.customButtonEventDispatcher = customButtonEventDispatcher;
  },
  methods: {
    handleClick(event) {
      event.preventDefault(); // Always kill the default action because otherwise it will execute the href
      switch (this.type) {
        case ButtonType.LINK:
          switch (this.link.type) {
            case LinkType.EXTERNAL:
              this.openExternalLink();
              break;
            case LinkType.EXTERNAL_BLANK:
              this.openExternalLink(true);
              break;
            case LinkType.SCROLL_TO_NEXT_BLOCK:
              this.scrollToNextBlock();
              break;
            case LinkType.INTERNAL:
              this.openInternalLink();
              break;
            default:
              // Unknown link types will be dispatched as a custom event
              this.customButtonEventDispatcher.dispatchEvent(
                new CustomButtonEvent(CustomButtonEvent.FIRE, {
                  event: this.link.type,
                }),
              );
              break;
          }
          break;
        case ButtonType.ACTION:
        default:
          this.$emit('click');
          break;
      }
    },
    scrollToNextBlock() {
      const parentBlock = this.getParentBlock();

      if (parentBlock) {
        const nextSection = parentBlock.$el.nextElementSibling;
        if (nextSection) {
          VueScrollTo.scrollTo(nextSection, config.buttonConfig.scrollToNextBlockDuration, {
            offset: config.buttonConfig.scrollToNextBlockOffset,
            cancelable: true,
          });
        }
      }
    },
    openInternalLink() {
      const hash = this.link.target.split('#')[1];
      const target = this.link.target.split('#')[0];

      if (hash && this.$router.currentRoute.path === target) {
        window.location.hash = hash;
      } else {
        this.$router.push(this.link.target);
      }
    },
    openExternalLink(blank) {
      if (blank) {
        window.open(this.link.target);
      } else {
        window.location.href = this.link.target;
      }
    },
  },
};
