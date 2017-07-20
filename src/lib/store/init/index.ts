import init from './init';
import { SET_ROUTES } from './mutations';

export const InitNamespace = 'init';

export const InitMutationTypes = {
	SET_ROUTES: `${InitNamespace}/${SET_ROUTES}`,
};

export default init;
