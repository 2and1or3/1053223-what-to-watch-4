import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import {composeWithDevTools} from "redux-devtools-extension";

import App from './components/app/app.jsx';

import {reducer} from './reducer/reducer.js';
import {Operation} from './reducer/data/data.js';
import createApi from './api.js';

const rootContainer = document.querySelector(`#root`);


const onUnAuthorized = () => {
  store.dispatch(`for future`);
};

const api = createApi(onUnAuthorized);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(Operation.getPromoFilm());
store.dispatch(Operation.loadFilms());


ReactDOM.render(
    <Provider store = {store}>
      <App />
    </Provider>,
    rootContainer
);
