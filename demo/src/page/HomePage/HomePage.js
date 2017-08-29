import { AbstractContentPageComponent, ButtonType, LinkType } from 'vue-block-system';
import ButtonMain from '../../component/button/ButtonMain/ButtonMain';

export default {
	name: 'HomePage',
	extends: AbstractContentPageComponent,
	components: {
		ButtonMain,
	},
	created() {
		this.actions = [
			{
				label: 'Home',
				title: 'Home',
				type: ButtonType.LINK,
				link: {
					type: LinkType.INTERNAL,
					target: 'home',
				},
			},
			{
				label: 'About',
				title: 'About',
				type: ButtonType.LINK,
				link: {
					type: LinkType.INTERNAL,
					target: 'about',
				},
			},
			{
				label: 'Page not found',
				title: 'Page not found',
				type: ButtonType.LINK,
				link: {
					type: LinkType.INTERNAL,
					target: 'abcdefg',
				},
			},
			{
				label: 'MediaMonks.com (self)',
				title: 'MediaMonks.com',
				type: ButtonType.LINK,
				link: {
					type: LinkType.EXTERNAL,
					target: 'http://www.mediamonks.com',
				},
			},
			{
				label: 'MediaMonks.com (blank)',
				title: 'MediaMonks.com',
				type: ButtonType.LINK,
				link: {
					type: LinkType.EXTERNAL_BLANK,
					target: 'http://www.mediamonks.com',
				},
			},
			{
				label: 'Click me for an action',
				title: 'Click me for an action',
				type: ButtonType.ACTION,
				click: this.handleButtonMainClick,
			},
		];
	},
	computed: {
		ButtonType() { return ButtonType; },
	},
	methods: {
		handleRouteChangeComplete() {
			console.log('Route change is completed!');
		},
		handleButtonMainClick() {
			alert('clicked');
		},
	},
};
