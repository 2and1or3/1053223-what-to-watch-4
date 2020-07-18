import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import App from './components/app/app.jsx';

import {reducer} from './reducer/reducer.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {Operation as UserOperation} from './reducer/user/user.js';
import createApi from './api.js';
import {ActionCreator as ApplicationActionCreator} from './reducer/application/application.js';
import {ActionCreator as UserActionCreator} from './reducer/user/user.js';

import {UserStatus} from './consts.js';

const rootContainer = document.querySelector(`#root`);


const errorHandlers = {
  onUnAuthorized: () => {
    store.dispatch(UserActionCreator.checkAuthStatus(UserStatus.NO_AUTH));
  },
  showError: (message, code) => {
    store.dispatch(ApplicationActionCreator.showError(message, code));
  }
};

const api = createApi(errorHandlers);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(UserOperation.checkAuthStatus());
store.dispatch(DataOperation.getPromoFilm());
store.dispatch(DataOperation.loadFilms());


ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>,
    rootContainer
);
