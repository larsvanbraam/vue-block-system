// Global configuration object
export default {
	enablePageTransitionOut: true,
	blockConfig: {
		maxFindParentPageCount: 50,
	},
	buttonConfig: {
		scrollToNextBlockDuration: 1000,
		scrollToNextBlockOffset: 0,
		maxFindParentBlockCount: 50,
	},
	api: {
		initCall: '/api/page/{page}',
		pageCall: '/api/page/init',
		axiosInstance: null,
		layoutCache: true,
		stripLeadingSlash: false,
	},
	debugLabelStyling: {
		font: '10px/1 sans-serif',
		backgroundColor: 'red',
		color: 'white',
		padding: '5px',
		position: 'absolute',
		top: '0px',
		left: '0px',
	},
};
