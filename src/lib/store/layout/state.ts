export default {
	/**
	 * @property layoutCache
	 * @description A cache object to store the loaded layouts in memory for faster retrieval
	 */
	layoutCache: {},
	/**
	 * @property blocks
	 * @description Array containing the currently displayed blocks
	 */
	blocks: [],
	/**
	 * @property pageTitle
	 * @description The title of the current page
	 */
	pageTitle: '',
	/**
	 * @property pageData
	 * @description Any extra data required on the page
	 */
	pageData: {},
	/**
	 * @property pageId
	 * @description The id of the current page
	 */
	pageId: '',
	/**
	 * @property
	 * @description An array of urls that failed so we do not try to load it again when it fails!
	 */
	unknownUrls: [],
}

