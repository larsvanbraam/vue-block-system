import { IAbstractTransitionComponent } from 'vue-transition-component';
import { IAbstractContentPageComponent } from './IAbstractContentPageComponent';
import { IAbstractBlockComponent } from './IAbstractBlockComponent';

export interface IAbstractComponent extends IAbstractTransitionComponent {
  /**
   * @public
   * @method getParentPage
   * @description Method that returns the parent page of the current component
   * @returns {IAbstractPageTransitionComponent}
   */
  getParentPage(): IAbstractContentPageComponent;
  /**
   * @public
   * @method getParentBlock
   * @description Method that returns the first parent block of the current component
   * @returns {IAbstractBlockComponent}
   */
  getParentBlock(): IAbstractBlockComponent;
}
