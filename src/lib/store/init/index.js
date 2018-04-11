import init, { SET_DATA, SET_INIT } from './init';

export const InitNamespace = 'init';

export const InitMutationTypes = {
  SET_DATA: `${InitNamespace}/${SET_DATA}`,
};

export const InitActionTypes = {
  SET_INIT: `${InitNamespace}/${SET_INIT}`,
};

export default init;
