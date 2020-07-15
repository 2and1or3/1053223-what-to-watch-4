import {URL} from '../../consts.js';
import {adapterToLocalFilms, extend} from '../../utils.js';
import {ActionCreator as ApplicationActionCreator} from '../application/application.js';

const ActionType = {
  LOAD_FILMS: `loadFilms`,
};

const initialState = {
  films: [],
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {films: action.payload});

    default:
      return state;
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {

    return api.get(URL.LOAD)
      .then((response) => adapterToLocalFilms(response.data))
      .then((localFilms) => dispatch(ActionCreator.loadFilms(localFilms)))
      .catch((err) => {
        throw err;
      });
  },

  getPromoFilm: () => (dispatch, getState, api) => {

    return api.get(URL.PROMO)
      .then((response) => adapterToLocalFilms([response.data]))
      .then(([localFilm]) => dispatch(ApplicationActionCreator.setCurrentFilm(localFilm)))
      .catch((err) => {
        throw err;
      });
  },

  togggleFavorite: (filmId, status) => (dispatch, getState, api) => {

    return api.post(`${URL.FAVORITE}${filmId}/${status}`)
    .then((response) => adapterToLocalFilms([response.data]))
    .then(([localFilm]) => dispatch(ApplicationActionCreator.setCurrentFilm(localFilm)))
    .catch((err) => {
      throw err;
    });
  }
};

export {reducer, Operation, ActionType};
