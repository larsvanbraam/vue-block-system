import { AbstractTransitionController } from 'vue-transition-component';

class BlockBarTransitionController extends AbstractTransitionController {
	/**
	 * @public
	 * @method setupTransitionInTimeline
	 * @description Use this method to setup your transition in timeline
	 * */
	protected setupTransitionInTimeline(): void {
		this.transitionInTimeline.fromTo(this.viewModel.$el, 1, { autoAlpha: 0 }, { autoAlpha: 1 });
	}

	/**
	 * @public
	 * @method setupTransitionOutTimeline
	 * @description Use this method to setup your transition out timeline
	 * */
	protected setupTransitionOutTimeline(): void {
		this.transitionOutTimeline.to(this.viewModel.$el, 0.2, { autoAlpha: 0 });
	}
}

export default BlockBarTransitionController;
