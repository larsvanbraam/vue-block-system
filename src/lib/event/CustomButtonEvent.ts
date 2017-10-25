import AbstractEvent from 'seng-event/lib/AbstractEvent';
import { generateEventTypes, EVENT_TYPE_PLACEHOLDER } from 'seng-event/lib/util/eventTypeUtils';

class CustomButtonEvent extends AbstractEvent {
	public static FIRE: string = EVENT_TYPE_PLACEHOLDER;

	constructor(
		type: string,
		public data?: { event: string },
		bubbles?: boolean,
		cancelable?: boolean,
		setTimeStamp?: boolean,
	) {
		super(type, bubbles, cancelable, setTimeStamp);
	}

	public clone(): CustomButtonEvent {
		return new CustomButtonEvent(this.type, this.data, this.bubbles, this.cancelable);
	}
}

generateEventTypes({ CustomButtonEvent });

export default CustomButtonEvent;

