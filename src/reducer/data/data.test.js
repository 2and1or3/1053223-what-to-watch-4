import MockAdapter from "axios-mock-adapter";

import {reducer, ActionType, Operation} from './data.js';
import createApi from '../../api.js';
import {adapterToLocalFilms} from '../../utils.js';
import {DEFAULT_FILM} from '../../consts.js';

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
  }
];

const comments = [{
  id: `0`,
  author: `Kate Muir`,
  date: `Month dd, yyyy`,
  description: `The mannered, madcap proceedings are often delightful`,
  rate: `8.9`,
},
{
  id: `1`,
  author: `Bill Goodykoontz`,
  date: `Month dd, yyyy`,
  description: `The mannered, madcap proceedings are often delightful`,
  rate: `8.9`,
}];

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

const SERVER_COMMENTS = [
  {
    "id": `0`,
    "user": {
      "id": `4`,
      "name": `Kate Muir`
    },
    "rating": `8.9`,
    "comment": `The mannered, madcap proceedings are often delightful`,
    "date": `Month dd, yyyy`
  },
  {
    "id": `1`,
    "user": {
      "id": `5`,
      "name": `Bill Goodykoontz`
    },
    "rating": `8.9`,
    "comment": `The mannered, madcap proceedings are often delightful`,
    "date": `Month dd, yyyy`
  }
];

const api = createApi(() => {});

describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state in default case`, () => {
    const initialState = {
      films: [],
      commentsById: [],
      promoFilm: DEFAULT_FILM,
    };

    expect(reducer(void 0, {})).toEqual(initialState);
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

  it(`Reducer should return state with promo film`, () => {
    const stateBefore = {
      promoFilm: DEFAULT_FILM,
    };
    const action = {
      type: ActionType.SET_PROMO_FILM,
      payload: films[0],
    };
    const stateAfter = {
      promoFilm: films[0],
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it(`Reducer should return state with comments`, () => {
    const stateBefore = {
      commentsById: [],
    };
    const action = {
      type: ActionType.SET_COMMENTS_BY_ID,
      payload: comments,
    };
    const stateAfter = {
      commentsById: comments,
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
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
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
          type: ActionType.SET_PROMO_FILM,
          payload: adapterToLocalFilms([SERVER_FILM])[0],
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it(`loadComments should load comments from /comments/:id`, () => {
    const dispatch = jest.fn();
    const filmId = 0;
    const loader = Operation.loadComments(filmId);
    const mockApi = new MockAdapter(api);

    mockApi
    .onGet(`/comments/0`)
    .reply(200, SERVER_COMMENTS);

    return loader(dispatch, null, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: ActionType.SET_COMMENTS_BY_ID,
          payload: comments,
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
          type: ActionType.UPDATE_FILMS,
          payload: adapterToLocalFilms([SERVER_FILM])[0],
        });
      })
      .catch((err) => {
        throw err;
      });

  });
});

// npm run test.jest -- reducer/data/data.test.js
