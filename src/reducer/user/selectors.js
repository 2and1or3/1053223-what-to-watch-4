import NameSpace from '../namespace';

const getUserStatus = (state) => state[NameSpace.USER].authStatus;

export {getUserStatus};
