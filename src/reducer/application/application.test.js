import {reducer, ActionType, ActionCreator} from './application.js';
import {STEP_VISIBLE_CARDS} from '../../consts.js';


const films = [
  {
    id: `0`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    isFavorite: false,
    src: `path`,
    genre: `comedy`,
    release: `2014`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    rating: 8.9,
    voiceCount: 240,
    duration: 99,
    director: `Wes Andreson`,
    actors: [
      `Bill Murray`,
      `Edward Norton`,
      `Jude Law`,
      `Willem Dafoe`,
      `Saoirse Ronan`,
      `Tony Revoloru`,
      `Tilda Swinton`,
      `Tom Wilkinson`,
      `Owen Wilkinson`,
      `Adrien Brody`,
      `Ralph Fiennes`,
      `Jeff Goldblum`],
    commentIds: [`0`, `1`, `2`, `3`, `4`, `5`],
  },
];

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


describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    const initialState = {
      screen: `main`,
      currentFilm: DEFAULT_FILM,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Reducer should return changed state with new current genre`, () => {
    const stateBefore = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };
    const action = {
      type: ActionType.SET_FILTER,
      payload: `comedy`,
    };
    const stateAfter = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `comedy`,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with details screen`, () => {
    const stateBefore = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };
    const action = {
      type: ActionType.CHANGE_SCREEN,
      payload: `details`,
    };
    const stateAfter = {
      screen: `details`,
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with current film`, () => {
    const stateBefore = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };
    const action = {
      type: ActionType.SET_CURRENT_FILM,
      payload: films[0],
    };
    const stateAfter = {
      screen: `main`,
      currentFilm: films[0],
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with reseted visibleCards field`, () => {
    const stateBefore = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: 100,
    };
    const action = {
      type: ActionType.RESET_VISIBLE_CARDS,
      payload: null,
    };
    const stateAfter = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator should return correct action for setFilter`, () => {
    const filter = `drama`;
    const resultAction = {
      type: ActionType.SET_FILTER,
      payload: filter,
    };

    expect(ActionCreator.setFilter(filter)).toEqual(resultAction);
  });

  it(`Action creator should return correct action for changeScreen`, () => {
    const nextScreen = `details`;
    const resultAction = {
      type: ActionType.CHANGE_SCREEN,
      payload: nextScreen,
    };

    expect(ActionCreator.changeScreen(nextScreen)).toEqual(resultAction);
  });

  it(`Action creator should return correct action for setCurrentFilm`, () => {
    const currentFilm = films[0];
    const resultAction = {
      type: ActionType.SET_CURRENT_FILM,
      payload: currentFilm,
    };

    expect(ActionCreator.setCurrentFilm(currentFilm)).toEqual(resultAction);
  });

  it(`Action creator should return correct action for addVisibleCards`, () => {
    const resultAction = {
      type: ActionType.ADD_VISIBLE_CARDS,
      payload: STEP_VISIBLE_CARDS,
    };

    expect(ActionCreator.addVisibleCards()).toEqual(resultAction);
  });

  it(`Action creator should return correct action for resetVisibleCards`, () => {
    const resultAction = {
      type: ActionType.RESET_VISIBLE_CARDS,
      payload: null,
    };

    expect(ActionCreator.resetVisibleCards()).toEqual(resultAction);
  });
});
