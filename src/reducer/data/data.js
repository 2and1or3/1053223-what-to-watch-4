import {URL, DEFAULT_FILM} from '../../consts.js';
import {adapterToLocalFilms, adapterToLocalComments, extend, getUniqueGenres} from '../../utils.js';
import {ActionCreator as ApplicationActionCreator} from '../application/application.js';

const ActionType = {
  LOAD_FILMS: `loadFilms`,
  SET_PROMO_FILM: `setPromoFilm`,
  SET_COMMENTS_BY_ID: `setCommentsById`,
  UPDATE_FILMS: `updateFilms`,
};

const initialState = {
  films: [],
  promoFilm: DEFAULT_FILM,
  commentsById: [],
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),

  setPromoFilm: (film) => ({
    type: ActionType.SET_PROMO_FILM,
    payload: film,
  }),

  setCommentsById: (comments) => ({
    type: ActionType.SET_COMMENTS_BY_ID,
    payload: comments,
  }),

  updateFilms: (film) => ({
    type: ActionType.UPDATE_FILMS,
    payload: film,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {films: action.payload});

    case ActionType.SET_PROMO_FILM:
      return extend(state, {promoFilm: action.payload});

    case ActionType.SET_COMMENTS_BY_ID:
      return extend(state, {commentsById: action.payload});

    case ActionType.UPDATE_FILMS:
      const updatedFilm = action.payload;
      let updatedFilms = state.films.slice();
      updatedFilms[updatedFilm.id - 1] = updatedFilm;

      return extend(state, {films: updatedFilms});

    default:
      return state;
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {

    return api.get(URL.LOAD)
      .then((response) => adapterToLocalFilms(response.data))
      .then((localFilms) => {

        const genres = localFilms.map((localFilm) => localFilm.genre);
        const uniqueGenres = getUniqueGenres(genres);

        dispatch(ActionCreator.loadFilms(localFilms));
        dispatch(ApplicationActionCreator.setGenres(uniqueGenres));
      })
      .catch((err) => {
        throw err;
      });
  },

  getPromoFilm: () => (dispatch, getState, api) => {

    return api.get(URL.PROMO)
      .then((response) => adapterToLocalFilms([response.data]))
      .then(([localFilm]) => dispatch(ActionCreator.setPromoFilm(localFilm)))
      .catch((err) => {
        throw err;
      });
  },

  loadComments: (filmId) => (dispatch, getState, api) => {

    return api.get(URL.COMMENT + filmId)
      .then((response) => adapterToLocalComments(response.data))
      .then((localComments) => dispatch(ActionCreator.setCommentsById(localComments)))
      .catch((err) => {
        throw err;
      });
  },

  togggleFavorite: (filmId, status) => (dispatch, getState, api) => {

    return api.post(`${URL.FAVORITE}${filmId}/${status}`)
    .then((response) => adapterToLocalFilms([response.data]))
    .then(([localFilm]) => dispatch(ActionCreator.updateFilms(localFilm)))
    .catch((err) => {
      throw err;
    });
  }
};

export {reducer, Operation, ActionType, ActionCreator};
