import IBlock from '../block/IBlock';

interface IPageLayout {
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
	 * @property blocks
	 * @description The array of blocks that make up the page
	 */
	blocks: Array<IBlock>;
}

export default IPageLayout;
