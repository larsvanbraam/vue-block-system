import { IAbstractTransitionComponent } from 'vue-transition-component';
import ButtonType from '../enum/ButtonType';
import ILink from './action/ILink';

interface IAbstractButtonComponent extends IAbstractTransitionComponent {
	/**
	 * @property
	 * @description The type of the button
	 */
	type: ButtonType;
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

export default IAbstractButtonComponent;
