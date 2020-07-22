import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from './components/app/app';

import {reducer} from './reducer/reducer';
import {Operation as DataOperation} from './reducer/data/data';
import {Operation as UserOperation} from './reducer/user/user';
import createApi from './api';
import {ActionCreator as ApplicationActionCreator} from './reducer/application/application';
import {ActionCreator as UserActionCreator} from './reducer/user/user';

import {UserStatus} from './consts';
import {noop} from './utils';

const rootContainer = document.querySelector(`#root`);


const errorHandlers = {
  onUnAuthorized: () => {
    store.dispatch(UserActionCreator.checkAuthStatus(UserStatus.NO_AUTH));
  },
  showError: (message, code) => {
    store.dispatch(ApplicationActionCreator.showError(message, code));
  }
};

const initApp = () => {
  ReactDOM.render(
      <Provider store = {store}>
        <App />
      </Provider>,
      rootContainer
  );
};

const api = createApi(errorHandlers);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

Promise.all([
  store.dispatch(UserOperation.checkAuthStatus()).catch(noop),
  store.dispatch(DataOperation.getPromoFilm()),
  store.dispatch(DataOperation.loadFilms())])
  .then(() => initApp())
  .catch((err) => {
    throw err;
  });
