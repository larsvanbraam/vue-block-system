import user, { SET_USER } from './user';

export const UserNamespace = 'user';

export const UserMutationTypes = {
	SET_USER: `${UserNamespace}/${SET_USER}`,
};

export default user;
