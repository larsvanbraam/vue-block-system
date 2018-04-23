import { IAbstractBlockComponent } from './IAbstractBlockComponent';
import { IAbstractComponent } from './IAbstractComponent';

export interface IAbstractContentPageComponent extends IAbstractComponent {
  /**
   * @public
   * @method handleBlockComponentReady
   * @description When a block component is registered it fires a isReady event this isReady event is handled
   * by this method it checks if all the components are loaded.
   * @param component
   * @param callback
   */
  handleBlockComponentReady(component: IAbstractBlockComponent, callback: () => void): void;
  /**
   * @public
   * @method handleRouteChange
   * @description When the beforeRouteEnter or beforeRouteUpdate is triggered we fire the route change event,
   * this will ask the store to update the layout!
   * @param route
   * @returns {Promise<void>}
   */
  handleRouteChange(route): Promise<void>;
  /**
   * @public
   * @description When the route change is completed this method is triggered, this can be used to implement
   * page tracking, or show page loaders.
   * @method handleRouteChangeComplete
   * @returns {void}
   */
  handleRouteChangeComplete(): void;
  /**
   * @public
   * @method scrollToBlockFromUrl
   * @description After page is loaded we can scroll to a block based on the scrollId
   * @returns {Promise<void>}
   */
  scrollToBlockFromUrl(): Promise<void>;
  /**
   * @public
   * @method handleBlockEnterView
   * @description When a block enters the view we want to trigger the transition in method and mark the block
   * as inView
   * @returns {void}
   */
  handleBlockEnterView(): void;
  /**
   * @public
   * @method handleBlockBeyondView
   * @description When the scrollbar is dragged down super fast the default enter view event might not be
   * triggered therefor we have a beyondView event! If it's already transitioned in it will do nothing! But if
   * it's not transitioned in it will still try to transitionIn
   * @returns {void}
   */
  handleBlockBeyondView(): void;
  /**
   * @Public
   * @method handleBlockLeaveView
   * @description When a block leaves the view we set the inView flag to false
   * @returns {void}
   */
  handleBlockLeaveView(): void;
  /**
   * @public
   * @method addBlocksToScrollTracker
   * @description When we want to add new block components to the scrollTracker we can use this method to add
   * them and let them transition in when they enter the view
   * @returns {void}
   */
  addBlocksToScrollTracker(): void;
  /**
   * @public
   * @method removeBlocksFromScrollTracker
   * @description When we want to remove blocks from the scroll tracker you can pass an object with the blocks
   * you want to remove.
   * @param blocks
   * @returns {void}
   */
  removeBlocksFromScrollTracker(blocks: { [id: string]: IAbstractBlockComponent }): void;
  /**
   * @public
   * @method handleResize
   * @description When the window resize event is triggered  we need to recalculate the scrollTrackerPoints so the
   * transitionIn happens on the right moments!
   * @returns {void}
   */
  handleResize(): void;
}
