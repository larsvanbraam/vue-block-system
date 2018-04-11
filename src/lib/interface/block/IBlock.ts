export interface IBlock {
  /**
   * @property
   * @description The id of the block
   */
  id: string;
  /**
   * @property
   * @description the unique index of the blockx
   */
  blockIndex?: number;
  /**
   * @property
   * @description A unique name set in the backend do allow scrolling to the component from the URL
   */
  scrollId?: string;
  /**
   * @property
   * @description The data for the block
   */
  data: any;
}
