import { AbstractTransitionController } from 'vue-transition-component';
import { TimelineLite, TimelineMax } from 'gsap';

export default class {{name_pc}}TransitionController extends AbstractTransitionController {
  /**
   * @protected
   * @method setupTransitionInTimeline
   * @param {TimelineLite | TimelineMax} timeline
   * @description Use this method to setup your transition in timeline
   **/
  protected setupTransitionInTimeline(timeline:TimelineLite|TimelineMax): void {}

  /**
   * @protected
   * @method setupTransitionOutTimeline
   * @param {TimelineLite | TimelineMax} timeline
   * @description Use this method to setup your transition out timeline
   **/
  protected setupTransitionOutTimeline(timeline:TimelineLite|TimelineMax): void {}

  /**
   * @protected
   * @method setupLoopingAnimationTimeline
   * @param {TimelineMax} timeline
   * @description Use this method to setup your looping timeline
   **/
  protected setupLoopingAnimationTimeline(timeline:TimelineMax): void {}
}
