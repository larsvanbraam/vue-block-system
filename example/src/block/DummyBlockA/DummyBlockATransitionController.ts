import { TimelineLite, TimelineMax, Expo } from 'gsap';
import {AbstractTransitionController, IAbstractTransitionComponent} from 'vue-transition-component';

export default class DummyBlockATransitionController extends AbstractTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionInTimeline(timeline: TimelineLite | TimelineMax): void {
    const { DummyButton } = this.parentController.$refs;

    timeline.fromTo(
      this.parentController.$el,
      0.5,
      {
        autoAlpha: 0,
        scale: 0.8,
      },
      {
        autoAlpha: 1,
        scale: 1,
        ease: Expo.easeOut,
      },
    );

    if (DummyButton) {
      timeline.add(this.getSubTimeline(<IAbstractTransitionComponent>DummyButton));
    }
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionOutTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.to(this.parentController.$el, 0.5, {
      autoAlpha: 0,
    });
  }
}
