import {createSelector} from "reselect";

import NameSpace from '../namespace.js';
import {getFilms} from '../data/selectors.js';
import {DEFAULT_FILM} from '../../consts.js';

const NAME_SPACE = NameSpace.APPLICATION;

const getCurrentFilm = (state) => state[NAME_SPACE].currentFilm;

const getCurrentGenre = (state) => state[NAME_SPACE].currentGenre;

const getVisibleCards = (state) => state[NAME_SPACE].visibleCards;

const getError = (state) => state[NAME_SPACE].error;

const getUrlId = (state, ownProps) => ownProps.match && ownProps.match.params.id.slice(1);

const getFilteredFilms = createSelector(
    getCurrentGenre,
    getFilms,
    (genre, films) => {
      return films.filter((film) => genre === film.genre);
    });

const getFilmById = createSelector(
    getFilms,
    getUrlId,
    (films, id) => {
      return films.find((film) => film.id === id) || DEFAULT_FILM;
    });

const getFavoriteFilms = createSelector(
    getFilms,
    (films) => {
      return films.filter((film) => film.isFavorite);
    }
);


export {getCurrentFilm, getCurrentGenre, getVisibleCards, getFilteredFilms, getError, getFilmById, getFavoriteFilms};
