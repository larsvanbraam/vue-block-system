import { IParsedBlocks } from '../block/IParsedBlocks';

export interface IPageLayout {
  /**
   * @property id
   * @description The unique id of the displayed page
   */
  id: string;
  /**
   * @public
   * @property The title of the displayed page
   */
  title: string;
  /**
   * @property
   * @description any extra data required for the site layout or
   */
  data?: any;
  /**
   * @property
   * @description By default every page is cached, with this boolean you can disable caching the layout per page.
   */
  disableCache: boolean;
  /**
   * @property blocks
   * @description The array of blocks that make up the page
   */
  blocks: IParsedBlocks;
}
