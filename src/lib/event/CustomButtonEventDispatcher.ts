import sengEvent from 'seng-event';

export class CustomButtonEventDispatcher extends sengEvent {
	constructor() {
		super();
	}
}

// Create an instance so we can listen to the custom events
const customButtonEventDispatcher = new CustomButtonEventDispatcher();

// Expose the custom button event dispatcher
export default customButtonEventDispatcher;