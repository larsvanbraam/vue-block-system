import { TimelineLite, TimelineMax, Expo } from 'gsap';
import { AbstractTransitionController } from "vue-transition-component";

export default class ContentPageTransitionController extends AbstractTransitionController {
  /**
   * @protected
   * @method setupTransitionInTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  protected setupTransitionInTimeline(timeline: TimelineLite | TimelineMax): void {
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
   * @protected
   * @method setupTransitionOutTimeline
   * @param {gsap.TimelineLite | gsap.TimelineMax} timeline
   */
  protected setupTransitionOutTimeline(timeline: TimelineLite | TimelineMax): void {
    timeline.to(
      this.parentController.$el,
      0.5,
      {
        autoAlpha: 0,
        ease: Expo.easeIn,
      },
    );
  }

  /**
   * @protected
   * @method stopLoopingAnimation
   * @description Stop the looping animations on the current component
   */
  protected setupLoopingAnimationTimeline(timeline: TimelineMax): void {}
}
