import MockAdatper from "axios-mock-adapter";

import {reducer, ActionType, Operation} from './user.js';
import createApi from '../../api.js';
import {URL} from '../../consts.js';
import {ActionType as ApplicationActionType} from '../application/application.js';

const api = createApi({});

describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    const initialState = {
      authStatus: `NO_AUTH`,
    };

    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Reducer should update state by given value`, () => {
    const stateBefore = {
      authStatus: `NO_AUTsssH`,
    };
    const action = {
      type: ActionType.CHECK_AUTH_STATUS,
      payload: `AUTH`,
    };
    const stateAfter = {
      authStatus: `AUTH`,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});

describe(`Operation works correctly`, () => {
  it(`Successful get request on /login updates authStatus in "AUTH"`, () => {
    const dispatch = jest.fn();
    const checkStatus = Operation.checkAuthStatus();

    const mockApi = new MockAdatper(api);
    mockApi
    .onGet(URL.LOGIN)
    .reply(200, {});

    return checkStatus(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.CHECK_AUTH_STATUS,
          payload: `AUTH`,
        });
      })
        .catch((err) => {
          throw err;
        });
  });

  it(`Successful post request on /login updates authStatus in "AUTH" and changes screen on "main"`, () => {
    const dispatch = jest.fn();
    const sendAuth = Operation.sendAuth(`login@gmail.com`, `sdfa2ada2`);

    const mockApi = new MockAdatper(api);
    mockApi
    .onPost(URL.LOGIN)
    .reply(200, {});

    return sendAuth(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.CHECK_AUTH_STATUS,
          payload: `AUTH`,
        });
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ApplicationActionType.CHANGE_SCREEN,
          payload: `main`,
        });
      })
        .catch((err) => {
          throw err;
        });
  });
});
