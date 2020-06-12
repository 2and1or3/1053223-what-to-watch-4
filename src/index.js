import React from "react";
import ReactDOM from "react-dom";

import App from './components/app/app.jsx';

const rootContainer = document.querySelector(`#root`);

const promoFilm = {
  title: `The Grand Budapest Hotel`,
  genres: [`Drama`],
  release: `2014`,
};

ReactDOM.render(
    <App promoTitle = {promoFilm.title} promoGenres = {promoFilm.genres} promoRelease = {promoFilm.release}/>,
    rootContainer
);
