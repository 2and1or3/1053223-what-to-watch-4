import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from './app';
import {createVideoMock} from '../../utils';
import NameSpace from '../../reducer/namespace';
import {FilmType} from '../../types';
import {noop} from '../../utils';

const mockStore = configureStore();

const films: FilmType[] = [
  {
    id: `0`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    backgroundColor: `#000`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    isFavorite: false,
    src: `path`,
    genre: `Drama`,
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
    backgroundColor: `#000`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    isFavorite: false,
    src: `path`,
    genre: `Drama`,
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
    id: `2`,
    title: `Macbeth`,
    poster: `img/macbeth.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    backgroundColor: `#000`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    isFavorite: false,
    src: `path`,
    genre: `Drama`,
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
  }];


const commonProps = {
  films,
  promoFilm: films[0],
  onExit: noop,
  error: {
    message: ``,
    code: ``,
  },
  onClose: noop,
  onAuthSubmit: noop,
  onCommentSend: noop,
};

it(`Render App component`, () => {
  const initialState = {
    [NameSpace.APPLICATION]: {
      currentFilm: films[0],
      currentGenre: `all`,
      genres: [
        {
          id: `id1`,
          title: `id1`,
        },
        {
          id: `id2`,
          title: `id2`,
        },
      ]
    },
    [NameSpace.DATA]: {
      films,
    },
    [NameSpace.USER]: {
      authStatus: `NO_AUTH`,
    },
  };

  const store = mockStore(initialState);

  const tree = renderer
    .create(
        <Provider store = {store}>
          <App
            {...commonProps}
          />
        </Provider>, {
          createNodeMock: createVideoMock})
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/app/app.test
