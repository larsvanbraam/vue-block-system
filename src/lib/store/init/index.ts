import init from './init';
import { SET_DATA } from './mutations';

export const InitNamespace = 'init';

export const InitMutationTypes = {
	SET_DATA: `${InitNamespace}/${SET_DATA}`,
};

export default init;
