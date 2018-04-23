import { IAbstractComponent } from './IAbstractComponent';
import { ILink } from '../action/ILink';

export interface IAbstractButtonComponent extends IAbstractComponent {
  /**
   * @property
   * @description The type of the button
   */
  type: string;
  /**
   * @public
   * @property
   * @description The data provided for a link
   */
  link?: ILink;
  /**
   * @public
   * @Method handleClick
   */
  handleClick(): void;
  /**
   * @public
   * @method openInternalLink
   */
  openInternalLink(): void;
  /**
   * @Public
   * @method openExternalLInk
   * @param blank
   */
  openExternalLink(blank?: boolean): void;
}
