import {GenreType, ScreenType, STEP_VISIBLE_CARDS} from '../../consts.js';
import {extend} from '../../utils.js';

const ActionType = {
  SET_FILTER: `setFilter`,
  UPDATE_FILTERED_FILMS: `updateFilteredFilms`,
  CHANGE_SCREEN: `changeScreen`,
  SET_CURRENT_FILM: `setCurrentFilm`,
  ADD_VISIBLE_CARDS: `addVisibleCards`,
  RESET_VISIBLE_CARDS: `resetVisibleCards`,
};

const DEFAULT_FILM = {
  id: `default`,
  title: `default`,
  poster: `default`,
  preview: `default`,
  src: `default`,
  isFavorite: false,
  background: `default`,
  backgroundColor: `default`,
  cover: `default`,
  genre: `default`,
  release: `default`,
  description: `default`,
  rating: 8.9,
  voiceCount: 240,
  duration: 33,
  director: `default`,
  actors: [`default`],
  commentIds: [`default`],
};

const initialState = {
  screen: ScreenType.MAIN,
  currentFilm: DEFAULT_FILM,
  currentGenre: GenreType.ALL.id,
  visibleCards: STEP_VISIBLE_CARDS,
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
  }),
  addVisibleCards: () => ({
    type: ActionType.ADD_VISIBLE_CARDS,
    payload: STEP_VISIBLE_CARDS,
  }),
  resetVisibleCards: () => ({
    type: ActionType.RESET_VISIBLE_CARDS,
    payload: null,
  }),
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER:
      return extend(state, {currentGenre: action.payload});

    case ActionType.CHANGE_SCREEN:
      return extend(state, {screen: action.payload});

    case ActionType.SET_CURRENT_FILM:
      return extend(state, {currentFilm: action.payload});

    case ActionType.ADD_VISIBLE_CARDS:
      return extend(state, {visibleCards: state.visibleCards + action.payload});

    case ActionType.RESET_VISIBLE_CARDS:
      return extend(state, {visibleCards: STEP_VISIBLE_CARDS});

    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType};
