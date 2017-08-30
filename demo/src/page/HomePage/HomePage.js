import { AbstractContentPageComponent, ButtonType, LinkType } from 'vue-block-system';
import Actions from '../../component/Actions';

export default {
	name: 'HomePage',
	extends: AbstractContentPageComponent,
	components: {
		Actions,
	},
	created() {
		this.headerActions = [
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
				label: 'Click me for an action',
				title: 'Click me for an action',
				type: ButtonType.ACTION,
				click: this.handleButtonMainClick,
			},
		];
		this.noteActions = [
			{
				label: 'View project on NPM',
				title: 'View project on NPM',
				type: ButtonType.LINK,
				link: {
					type: LinkType.EXTERNAL_BLANK,
					target: 'https://www.npmjs.com/package/vue-block-system',
				},
			},
			{
				label: 'View project on GitHub',
				title: 'View project on GitHub',
				type: ButtonType.LINK,
				link: {
					type: LinkType.EXTERNAL_BLANK,
					target: 'https://www.github.com/larsvanbraam/vue-block-system',
				},
			},
			{
				label: 'View demo source',
				title: 'View demo source',
				type: ButtonType.LINK,
				link: {
					type: LinkType.EXTERNAL_BLANK,
					target: 'https://github.com/larsvanbraam/vue-block-system/tree/master/demo',
				},
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
			// eslint-disable-next-line no-useless-escape
			alert('Nothing here ¯\\_(ツ)_/¯');
		},
	},
};
