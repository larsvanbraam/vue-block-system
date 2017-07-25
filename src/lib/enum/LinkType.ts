/**
 * Enum for typing the type of the link. INTERNAL means triggering a this.$router.push, EXTERNAL means
 * window.location.href and EXTERNAL_BLANK means window.open
 */
enum LinkType {
	INTERNAL = 0,
	EXTERNAL = 1,
	EXTERNAL_BLANK = 2,
}

export default LinkType;
