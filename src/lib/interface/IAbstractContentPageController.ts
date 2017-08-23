import { IAbstractTransitionComponent } from 'vue-transition-component';
import IAbstractBlockComponent from './IAbstractBlockComponent';

interface IAbstractContentPageController extends IAbstractTransitionComponent {
	/**
	 * @public
	 * @method handleBlockComponentReady
	 * @param component
	 * @param callback
	 */
	handleBlockComponentReady(component: IAbstractBlockComponent, callback: () => void): void;
	/**
	 * @public
	 * @method handleRouteChange
	 * @param route
	 */
	handleRouteChange(route): Promise<void>;
	/**
	 * @public
	 * @method handleRouteChangeComplete
	 */
	handleRouteChangeComplete(): void;
	/**
	 * @public
	 * @method scrollToBlockFromUrl
	 */
	scrollToBlockFromUrl(): Promise<void>;
	/**
	 * @public
	 * @method handleBlockEnterView
	 */
	handleBlockEnterView(): void;
	/**
	 * @public
	 * @method handleBlockBeyondView
	 */
	handleBlockBeyondView(): void;
	/**
	 * @Public
	 * @method handleBlockLeaveView
	 */
	handleBlockLeaveView(): void;
	/**
	 * @public
	 * @method addBlocksToScrollTracker
	 */
	addBlocksToScrollTracker(): void;
	/**
	 * @public
	 * @method removeBlocksFromScrollTracker
	 * @param blocks
	 */
	removeBlocksFromScrollTracker(blocks: { [id: string]: IAbstractBlockComponent }): void;
	/**
	 * @Public
	 * @method handleResize
	 */
	handleResize(): void;
}

export default IAbstractContentPageController;
