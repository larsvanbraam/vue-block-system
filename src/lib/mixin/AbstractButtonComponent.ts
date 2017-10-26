import * as VueTypes from 'vue-types/dist';
import * as VueScrollTo from 'vue-scrollto/vue-scrollto';
import { AbstractTransitionComponent } from 'vue-transition-component';
import LinkType from '../enum/LinkType';
import ButtonType from '../enum/ButtonType';
import BlockSystemComponentType from '../enum/BlockSystemComponentType';
import customButtonEventDispatcher from '../event/CustomButtonEventDispatcher';
import CustomButtonEvent from '../event/CustomButtonEvent';
import config from '../config';

export default {
	name: 'AbstractButtonComponent',
	extends: AbstractTransitionComponent,
	props: {
		label: VueTypes.string,
		title: VueTypes.string.isRequired,
		type: VueTypes.oneOf(
			[
				ButtonType.ACTION,
				ButtonType.LINK,
			],
		).isRequired,
		link: VueTypes.shape(
			{
				type: VueTypes.any.isRequired,
				target: VueTypes.string,
			},
		),
	},
	beforeCreate() {
		this.customButtonEventDispatcher = customButtonEventDispatcher;
		this.blockSystemComponentType = BlockSystemComponentType.BUTTON_COMPONENT;
	},
	methods: {
		/**
		 * @public
		 * @method handleClick
		 * @description When the user clicks on the button a action is triggered!
		 */
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
		getParentBlock() {
			let parent = this.$parent;
			let attempts = 0;

			// Try to find the first parent that is a page, have a limit of 50 so we will never enter an infinite loop!
			while (
				parent.blockSystemComponentType !== BlockSystemComponentType.BLOCK_COMPONENT &&
				attempts < config.buttonConfig.maxFindParentBlockCount
				) {
				++attempts;
				parent = parent.$parent;
			}

			return parent;
		},
		scrollToNextBlock() {
			const parentBlock = this.getParentBlock();

			if (parentBlock) {
				const nextSection = parentBlock.$el.nextElementSibling;
				if (nextSection) {
					VueScrollTo.scrollTo(nextSection, config.buttonConfig.scrollToNextBlockDuration, {
						cancelable: true,
					});
				}
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
