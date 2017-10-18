import { Promise } from 'es6-promise';
import IBlock from '../interface/block/IBlock';
import IPageLayout from '../interface/layout/IPageLayout';
import BlockHelper from '../util/BlockHelper';

class PageLayoutHelper {

	/**
	 * @public
	 * @method parse
	 * @param pageLayout
	 * @param pageId
	 * @description Method that parses the page layout!
	 * @returns {Promise<IPageLayout>}
	 */
	public static parse(pageLayout: IPageLayout, pageId: string): Promise<IPageLayout> {
		return new Promise((resolve: (result: IPageLayout) => void) => {
			// Create the layout object
			const layout: IPageLayout = {
				id: pageId,
				data: pageLayout.data || {},
				title: pageLayout.title,
				blocks: {},
			};

			// Loop through all the blocks and check if they are valid
			layout.blocks = <{ [key: string]: IBlock }>BlockHelper.parseBlocks(
				layout.blocks, pageLayout.blocks);

			resolve(layout);
		});
	}
}

export default PageLayoutHelper;
