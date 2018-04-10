import BlockHelper from '../util/BlockHelper';
import { IPageLayout } from '../interface/layout/IPageLayout';
import { IBlock } from '../interface/block/IBlock';

export default class PageLayoutHelper {
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
        disableCache: pageLayout.disableCache || false,
        blocks: {},
      };

      // Loop through all the blocks and check if they are valid
      layout.blocks = <{ [key: string]: IBlock }>BlockHelper.parseBlocks(
        layout.blocks,
        pageLayout.blocks,
      );

      resolve(layout);
    });
  }
}
