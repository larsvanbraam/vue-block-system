/**
 * Enum for typing the type of the link. INTERNAL means triggering a this.$router.push, EXTERNAL means
 * window.location.href and EXTERNAL_BLANK means window.open
 */
export default {
	INTERNAL: 'link-type-internal',
	EXTERNAL: 'link-type-external',
	EXTERNAL_BLANK: 'link-type-external-blank',
	SCROLL_TO_NEXT_BLOCK: 'link-type-scroll-to-next-block',
	CUSTOM_EVENT: 'link-type-custom',
};
