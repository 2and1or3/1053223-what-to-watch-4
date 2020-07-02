import {films} from './mocks/films.js';
import {GenreType, ScreenType} from './consts.js';

const ActionType = {
  SET_FILTER: `setFilter`,
  UPDATE_FILTERED_FILMS: `updateFilteredFilms`,
  CHANGE_SCREEN: `changeScreen`,
  SET_CURRENT_FILM: `setCurrentFilm`,
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const initialState = {
  screen: ScreenType.MAIN,
  currentFilm: null,
  currentGenre: GenreType.ALL.id,
  films,
};

const ActionCreator = {
  setFilter: (newFilter) => ({
    type: ActionType.SET_FILTER,
    payload: newFilter,
  }),
  changeScreen: (screen) => ({
    type: ActionType.CHANGE_SCREEN,
    payload: screen,
  }),
  setCurrentFilm: (film) => ({
    type: ActionType.SET_CURRENT_FILM,
    payload: film,
  })
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER:
      return extend(state, {currentGenre: action.payload});

    case ActionType.CHANGE_SCREEN:
      return extend(state, {screen: action.payload});

    case ActionType.SET_CURRENT_FILM:
      return extend(state, {currentFilm: action.payload});

    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType};
