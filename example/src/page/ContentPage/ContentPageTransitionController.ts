import { TimelineLite, TimelineMax, Expo } from 'gsap';
import { AbstractTransitionController } from "vue-transition-component";

export default class ContentPageTransitionController extends AbstractTransitionController {
  /**
   * @public
   * @method setupTransitionInTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionInTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.fromTo(
      this.parentController.$el,
      0.5,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        ease: Expo.easeOut,
      },
    );
  }

  /**
   * @public
   * @method setupTransitionOutTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  public setupTransitionOutTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.to(
      this.parentController.$el,
      0.5,
      {
        autoAlpha: 0,
        ease: Expo.easeIn,
      },
    );
  }
}
