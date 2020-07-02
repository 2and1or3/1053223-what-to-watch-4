import {reducer, ActionType, ActionCreator} from './reducer.js';
import {STEP_VISIBLE_CARDS} from './consts.js';

const films = [
  {
    id: `0`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
  {
    id: `1`,
    title: `the Grand Budapest Hotel`,
    poster: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `drama`,
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
  {
    id: `2`,
    title: `Macbeth`,
    poster: `img/macbeth.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `drama`,
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
  {
    id: `3`,
    title: `Aviator`,
    poster: `img/aviator.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `drama`,
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
  {
    id: `4`,
    title: `We need to talk about Kevin`,
    poster: `img/we-need-to-talk-about-kevin.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
  {
    id: `5`,
    title: `What We Do in the Shadows`,
    poster: `img/what-we-do-in-the-shadows.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
  {
    id: `6`,
    title: `Revenant`,
    poster: `img/revenant.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
  {
    id: `7`,
    title: `Johnny English`,
    poster: `img/johnny-english.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
  {
    id: `8`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
  {
    id: `9`,
    title: `the Grand Budapest Hotel`,
    poster: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `drama`,
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
  {
    id: `10`,
    title: `Macbeth`,
    poster: `img/macbeth.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `drama`,
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
  {
    id: `11`,
    title: `Aviator`,
    poster: `img/aviator.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `drama`,
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
  {
    id: `12`,
    title: `We need to talk about Kevin`,
    poster: `img/we-need-to-talk-about-kevin.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `sciFi`,
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
  {
    id: `13`,
    title: `What We Do in the Shadows`,
    poster: `img/what-we-do-in-the-shadows.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `thriller`,
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
  {
    id: `14`,
    title: `Revenant`,
    poster: `img/revenant.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `thriller`,
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
  {
    id: `15`,
    title: `Johnny English`,
    poster: `img/johnny-english.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `horror`,
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
  {
    id: `16`,
    title: `Johnny English`,
    poster: `img/johnny-english.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `thriller`,
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
  {
    id: `17`,
    title: `Johnny English`,
    poster: `img/johnny-english.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `thriller`,
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

describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    const initialState = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(void 0, {})).toEqual(initialState);
  });

  it(`Reducer should return changed state with new current genre`, () => {
    const stateBefore = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
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
      films,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with details screen`, () => {
    const stateBefore = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
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
      films,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with current film`, () => {
    const stateBefore = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
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
      films,
      visibleCards: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return changed state with incremented visibleCards no more than films.length`, () => {
    const stateBeforeOne = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
      visibleCards: STEP_VISIBLE_CARDS,
    };
    const stateAfterOne = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
      visibleCards: 2 * STEP_VISIBLE_CARDS,
    };

    const stateBeforeTwo = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
      visibleCards: films.length,
    };
    const stateAfterTwo = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
      visibleCards: films.length,
    };

    const action = {
      type: ActionType.ADD_VISIBLE_CARDS,
      payload: STEP_VISIBLE_CARDS,
    };

    expect(reducer(stateBeforeOne, action)).toEqual(stateAfterOne);
    expect(reducer(stateBeforeTwo, action)).toEqual(stateAfterTwo);
  });

  it(`Reducer should return changed state with reseted visibleCards field`, () => {
    const stateBefore = {
      screen: `main`,
      currentFilm: null,
      currentGenre: `all`,
      films,
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
      films,
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
