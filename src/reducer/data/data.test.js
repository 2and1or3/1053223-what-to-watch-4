import MockAdapter from "axios-mock-adapter";

import {reducer, ActionType, Operation} from './data.js';
import {ActionType as ApplicationActionType} from '../application/application.js';
import createApi from '../../api.js';
import {adapterToLocalFilms} from '../../utils.js';

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
  {
    id: `1`,
    title: `the Grand Budapest Hotel`,
    poster: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    isFavorite: false,
    src: `path`,
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
  }
];

const SERVER_FILM = {
  "id": 1,
  "name": `The Grand Budapest Hotel`,
  "poster_image": `img/the-grand-budapest-hotel-poster.jpg`,
  "preview_image": `img/the-grand-budapest-hotel.jpg`,
  "background_image": `img/the-grand-budapest-hotel-bg.jpg`,
  "background_color": `#ffffff`,
  "video_link": `https://some-link`,
  "preview_video_link": `https://some-link`,
  "description": `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  "rating": 8.9,
  "scores_count": 240,
  "director": `Wes Andreson`,
  "starring": [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`],
  "run_time": 99,
  "genre": `Comedy`,
  "released": 2014,
  "is_favorite": false
};

const api = createApi(() => {});

describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    expect(reducer(void 0, {})).toEqual({films: []});
  });

  it(`Reducer should return state with new films`, () => {
    const stateBefore = {
      films: [],
    };
    const action = {
      type: ActionType.LOAD_FILMS,
      payload: films,
    };
    const stateAfter = {
      films,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});

describe(`Operation works correctly`, () => {
  it(`loadFilms should load films from /films`, () => {
    const dispatch = jest.fn();
    const loadFilms = Operation.loadFilms();
    const mockApi = new MockAdapter(api);

    mockApi
    .onGet(`/films`)
    .reply(200, [SERVER_FILM]);

    return loadFilms(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.LOAD_FILMS,
          payload: adapterToLocalFilms([SERVER_FILM]),
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it(`getPromoFilm should load promo film from /films/promo`, () => {
    const dispatch = jest.fn();
    const getPromo = Operation.getPromoFilm();
    const mockApi = new MockAdapter(api);

    mockApi
    .onGet(`/films/promo`)
    .reply(200, SERVER_FILM);

    return getPromo(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ApplicationActionType.SET_CURRENT_FILM,
          payload: adapterToLocalFilms([SERVER_FILM])[0],
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it(`togggleFavorite should toggle is_favorite on server and set updated film in currentFilm`, () => {
    const filmId = `1`;
    const status = 1;
    const dispatch = jest.fn();
    const toggle = Operation.togggleFavorite(filmId, status);
    const mockApi = new MockAdapter(api);

    mockApi
    .onPost(`/favorite/1/1`)
    .reply(200, SERVER_FILM);

    return toggle(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ApplicationActionType.SET_CURRENT_FILM,
          payload: adapterToLocalFilms([SERVER_FILM])[0],
        });
      })
      .catch((err) => {
        throw err;
      });

  });
});
