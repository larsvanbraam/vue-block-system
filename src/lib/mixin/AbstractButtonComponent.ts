import { AbstractTransitionComponent } from 'vue-transition-component';
import * as VueTypes from 'vue-types';
import LinkType from '../enum/LinkType';
import ButtonType from '../enum/ButtonType';

export default {
	name: 'AbstractButtonComponent',
	extends: AbstractTransitionComponent,
	props: {
		label: {
			type: String,
			required: true,
		},
		type: VueTypes.oneOf([ButtonType.ACTION, ButtonType.LINK]).isRequired,
		link: VueTypes.shape({
			type: VueTypes.oneOf([LinkType.INTERNAL, LinkType.EXTERNAL, LinkType.EXTERNAL_BLANK]).isRequired,
			target: {
				type: String,
				required: true,
			},
			label: {
				type: String,
				required: true,
			},
			title: {
				type: String,
				required: false,
			},
		}),
	},
	methods: {
		/**
		 * @public
		 * @method handleClick
		 * @description When the user clicks on the button a action is triggered!
		 */
		handleClick() {
			switch (this.type) {
				case ButtonType.LINK:
					switch (this.action.type) {
						case LinkType.EXTERNAL:
							this.openExternalLink();
							break;
						case LinkType.EXTERNAL_BLANK:
							this.openExternalLink(true);
							break;
						case LinkType.INTERNAL:
						default:
							this.openInternalLink();
							break;
					}
					break;
				case ButtonType.ACTION:
				default:
					this.$emit('click');
					break;
			}
		},
		/**
		 * @public
		 * @method openInternalLInk
		 * @description When the type is an internal link the router should navigate to the provided url
		 */
		openInternalLink() {
			this.$router.push(this.link.target);
		},
		/**
		 * @public
		 * @Method openExternalLink
		 * @description When the type is an external link we should open a new window with the provided target
		 */
		openExternalLink(blank) {
			if (blank) {
				window.open(this.link.target);
			} else {
				window.location.href = this.link.target;
			}
		},
	},
	mounted() {
		if (this.debugLabel) {
			this.addDebugLabel();
		}
	},
};
