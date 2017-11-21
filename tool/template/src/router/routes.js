import { COMPONENT_ID } from 'vue-block-system';
import ContentPage from 'page/ContentPage';
import PagePaths from 'data/enum/PagePaths';
import PageNames from 'data/enum/PageNames';

export default [
	{
		path: PagePaths.CONTENT_PAGE,
		component: ContentPage,
		name: PageNames.CONTENT_PAGE,
		props: {
			[COMPONENT_ID]: PageNames.CONTENT_PAGE,
		},
	},
];
