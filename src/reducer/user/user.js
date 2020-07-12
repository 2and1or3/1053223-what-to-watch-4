import {extend} from '../../utils.js';
import {URL, UserStatus, ScreenType} from '../../consts.js';
import {ActionCreator as ApplicationActionCreator} from '../application/application.js';


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

  sendAuth: (login, password) => (dispatch, getState, api) => {
    const body = {
      email: login,
      password,
    };

    return api.post(URL.LOGIN, body)
      .then(() => dispatch(ActionCreator.checkAuthStatus(UserStatus.AUTH)))
      .then(() => dispatch(ApplicationActionCreator.changeScreen(ScreenType.MAIN)))
      .catch((err) => {
        throw err;
      });
  },

  sendComment: (review, id, enableForm) => (dispatch, getState, api) => {

    return api.post(URL.COMMENT + id, review)
      .then(() => enableForm())
      .catch((err) => {
        enableForm();
        throw err;
      });
  }
};

export {reducer, Operation, ActionCreator, ActionType};
