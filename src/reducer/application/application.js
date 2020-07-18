import {GenreType, STEP_VISIBLE_CARDS, DEFAULT_FILM} from '../../consts.js';
import {extend} from '../../utils.js';


const ActionType = {
  SET_FILTER: `setFilter`,
  SET_CURRENT_FILM: `setCurrentFilm`,
  ADD_VISIBLE_CARDS: `addVisibleCards`,
  RESET_VISIBLE_CARDS: `resetVisibleCards`,
  SHOW_ERROR: `showError`,
};

const initialState = {
  currentFilm: DEFAULT_FILM,
  currentGenre: GenreType.ALL.id,
  visibleCards: STEP_VISIBLE_CARDS,
  error: {
    message: ``,
    code: ``,
  }
};

const ActionCreator = {
  setFilter: (newFilter) => ({
    type: ActionType.SET_FILTER,
    payload: newFilter,
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
  showError: (message, code) => ({
    type: ActionType.SHOW_ERROR,
    payload: {
      message,
      code,
    }
  })
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER:
      return extend(state, {currentGenre: action.payload});

    case ActionType.SET_CURRENT_FILM:
      return extend(state, {currentFilm: action.payload});

    case ActionType.ADD_VISIBLE_CARDS:
      return extend(state, {visibleCards: state.visibleCards + action.payload});

    case ActionType.RESET_VISIBLE_CARDS:
      return extend(state, {visibleCards: STEP_VISIBLE_CARDS});

    case ActionType.SHOW_ERROR:
      return extend(state, {error: action.payload});

    default:
      return state;
  }
};

export {reducer, ActionCreator, ActionType};
