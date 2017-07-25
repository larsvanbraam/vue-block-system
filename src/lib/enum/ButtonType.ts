/**
 * Enum for typing the type of the button. LINK means it's a link object which is usually provided in the block
 * data. If the type is set to ACTION this means an click event will be $emitted.
 */
enum ButtonType {
	LINK = 0,
	ACTION = 1,
}

export default ButtonType;
