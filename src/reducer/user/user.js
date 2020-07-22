import {extend} from '../../utils';
import {URL, UserStatus} from '../../consts';


const initialState = {
  authStatus: UserStatus.NO_AUTH,
};

const ActionType = {
  CHECK_AUTH_STATUS: `checkAuthStatus`,
};

const ActionCreator = {
  checkAuthStatus: (status) => ({
    type: ActionType.CHECK_AUTH_STATUS,
    payload: status,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case (ActionType.CHECK_AUTH_STATUS):
      return extend(state, {authStatus: action.payload});

    default:
      return state;
  }
};

const Operation = {
  checkAuthStatus: () => (dispatch, getState, api) => {

    return api.get(URL.LOGIN)
      .then(() => dispatch(ActionCreator.checkAuthStatus(UserStatus.AUTH)))
      .catch((err) => {
        throw err;
      });
  },

  sendAuth: (login, password, onSuccess) => (dispatch, getState, api) => {
    const body = {
      email: login,
      password,
    };

    return api.post(URL.LOGIN, body)
      .then(() => dispatch(ActionCreator.checkAuthStatus(UserStatus.AUTH)))
      .then(() => onSuccess())
      .catch((err) => {
        throw err;
      });
  },

  sendComment: (review, id, handleResponse) => (dispatch, getState, api) => {

    return api.post(URL.COMMENT + id, review)
      .then(() => handleResponse.onSuccess())
      .catch((err) => {

        throw err;
      });
  }
};

export {reducer, Operation, ActionCreator, ActionType};
