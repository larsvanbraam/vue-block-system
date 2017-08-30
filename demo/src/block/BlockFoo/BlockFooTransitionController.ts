import { AbstractTransitionController } from 'vue-transition-component';
import { Elastic, Back } from 'gsap';

class BlockFooTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(
			this.viewModel.$el,
			1,
			{ xPercent: -100, rotation: 180, autoAlpha: 0 },
			{ xPercent: 0, rotation: 0, autoAlpha: 1, ease: Elastic.easeOut },
		);
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
		this.transitionOutTimeline.to(
			this.viewModel.$el,
			0.5,
			{ xPercent: -100, ease: Back.easeIn },
		);
	}
}

export default BlockFooTransitionController;
