import LinkType from '../../enum/LinkType';

interface ILink {
	/**
	 * @property
	 * @description The label displayed in the action
	 */
	label?: string;
	/**
	 * @property
	 * @description The title used for accessibility
	 */
	title?: string;
	/**
	 * @property
	 * @description The target of the link
	 * @placeholder path/to/page
	 */
	target: string;
	/**
	 * @property
	 * @description The type of the link
	 * @placeholder 0
	 */
	type: LinkType;
}

export default ILink;
