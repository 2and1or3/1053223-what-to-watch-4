import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import App from './components/app/app.jsx';

import {reducer} from './reducer.js';

const rootContainer = document.querySelector(`#root`);

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const promoFilm = {
  title: `The Grand Budapest Hotel`,
  genres: [`Drama`],
  release: 2014,
};

ReactDOM.render(
    <Provider store = {store}>
      <App promoTitle = {promoFilm.title} promoGenres = {promoFilm.genres} promoRelease = {promoFilm.release}/>
    </Provider>,
    rootContainer
);
