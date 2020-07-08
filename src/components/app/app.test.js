import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from './app.jsx';
import {createVideoMock} from '../../utils.js';

const middlewares = [];

const mockStore = configureStore(middlewares);

const films = [
  {
    id: `0`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
    commentIds: [`0`, `1`, `2`, `3`, `4`, `5`],
  },
  {
    id: `1`,
    title: `the Grand Budapest Hotel`,
    poster: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
    commentIds: [`0`, `1`, `2`, `3`, `4`, `5`],
  },

  {
    id: `2`,
    title: `Macbeth`,
    poster: `img/macbeth.jpg`,
    preview: `path-to-video`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
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
    commentIds: [`0`, `1`, `2`, `3`, `4`, `5`],
  }];


const commonProps = {
  promoFilm: films[0],
  films,
  screen: `main`,
  currentFilm: films[0],
  onExit: () => {},
};


describe(`Render App component`, () => {
  it(`Redner main screen`, () => {
    const initialState = {
      films,
      currentFilm: films[0],
      currentGenre: `all`,
      onPlayClick: () => {},
    };

    const store = mockStore(initialState);

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              {...commonProps}
              screen = {`main`}
            />
          </Provider>, {
            createNodeMock: createVideoMock})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Redner details screen`, () => {
    const initialState = {
      films,
      currentFilm: films[0],
      currentGenre: `all`,
    };

    const store = mockStore(initialState);

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              {...commonProps}
              screen = {`detials`}
            />
          </Provider>, {
            createNodeMock: createVideoMock})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Redner player screen`, () => {
    const initialState = {
      films,
      currentFilm: films[0],
      currentGenre: `all`,
    };

    const store = mockStore(initialState);

    const tree = renderer
      .create(
          <Provider store = {store}>
            <App
              {...commonProps}
              screen = {`player`}
            />
          </Provider>, {
            createNodeMock: createVideoMock})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
