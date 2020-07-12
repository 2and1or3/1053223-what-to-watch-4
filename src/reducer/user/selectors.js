import NameSpace from '../namespace.js';

const getUserStatus = (state) => state[NameSpace.USER].authStatus;

export {getUserStatus};
