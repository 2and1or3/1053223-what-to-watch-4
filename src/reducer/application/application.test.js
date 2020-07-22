import {reducer, ActionType, ActionCreator} from './application';
import {STEP_VISIBLE_CARDS} from '../../consts';


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
};


describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    const initialState = {
      currentFilm: DEFAULT_FILM,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
      genres: [
        {
          id: `all`,
          title: `All genres`,
        }
      ],
      error: {
        message: ``,
        code: ``,
      }
    };

    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Reducer should return changed state with new current genre`, () => {
    const stateBefore = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };
    const action = {
      type: ActionType.SET_FILTER,
      payload: `comedy`,
    };
    const stateAfter = {
      currentFilm: null,
      currentGenre: `comedy`,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with current film`, () => {
    const stateBefore = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };
    const action = {
      type: ActionType.SET_CURRENT_FILM,
      payload: films[0],
    };
    const stateAfter = {
      currentFilm: films[0],
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with increased visibleCards`, () => {
    const stateBefore = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };
    const action = {
      type: ActionType.ADD_VISIBLE_CARDS,
      payload: STEP_VISIBLE_CARDS,
    };
    const stateAfter = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: 2 * STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with reseted visibleCards field`, () => {
    const stateBefore = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: 100,
    };
    const action = {
      type: ActionType.RESET_VISIBLE_CARDS,
      payload: null,
    };
    const stateAfter = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with error object`, () => {
    const stateBefore = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
      error: {
        message: ``,
        code: ``,
      }
    };
    const action = {
      type: ActionType.SHOW_ERROR,
      payload: {
        message: `not found`,
        code: `404`,
      },
    };
    const stateAfter = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
      error: {
        message: `not found`,
        code: `404`,
      },
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with unique genres and default genre "all"`, () => {
    const stateBefore = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
      genres: [
        {
          id: `all`,
          title: `All genres`,
        }
      ],
      error: {
        message: ``,
        code: ``,
      }
    };
    const uniqueGenres = [
      {
        id: `id1`,
        title: `id1`,
      },
      {
        id: `id2`,
        title: `id2`,
      },
    ];
    const action = {
      type: ActionType.SET_GENRES,
      payload: uniqueGenres,
    };
    const stateAfter = {
      currentFilm: null,
      currentGenre: `all`,
      visibleCards: STEP_VISIBLE_CARDS,
      genres: [
        {
          id: `all`,
          title: `All genres`,
        },
        {
          id: `id1`,
          title: `id1`,
        },
        {
          id: `id2`,
          title: `id2`,
        },
      ],
      error: {
        message: ``,
        code: ``,
      },
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

  it(`Action creator should return correct action for showError`, () => {
    const error = {
      message: `not found`,
      code: `404`,
    };

    const resultAction = {
      type: ActionType.SHOW_ERROR,
      payload: error,
    };

    expect(ActionCreator.showError(error.message, error.code)).toEqual(resultAction);
  });

  it(`Action creator should return correct action for setGenres`, () => {
    const uniqueGenres = [
      {
        id: `id1`,
        title: `id1`,
      },
      {
        id: `id2`,
        title: `id2`,
      },
    ];

    const resultAction = {
      type: ActionType.SET_GENRES,
      payload: uniqueGenres,
    };

    expect(ActionCreator.setGenres(uniqueGenres)).toEqual(resultAction);
  });
});

// npm run test.jest -- reducer/application/application.test
