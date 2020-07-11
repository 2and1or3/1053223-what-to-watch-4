import {createSelector} from "reselect";

import NameSpace from '../namespace.js';
import {getFilms} from '../data/selectors.js';

const NAME_SPACE = NameSpace.APPLICATION;

const getScreen = (state) => state[NAME_SPACE].screen;

const getCurrentFilm = (state) => state[NAME_SPACE].currentFilm;

const getCurrentGenre = (state) => state[NAME_SPACE].currentGenre;

const getVisibleCards = (state) => state[NAME_SPACE].visibleCards;

const getFilteredFilms = createSelector(
    getCurrentGenre,
    getFilms,
    (genre, films) => {
      return films.filter((film) => genre === film.genre);
    });

export {getScreen, getCurrentFilm, getCurrentGenre, getVisibleCards, getFilteredFilms};
