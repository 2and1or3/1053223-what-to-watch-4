import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {FilmList} from './film-list';
import {createVideoMock} from '../../utils';
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
  filmsToRender: films,
  onCardClick: noop,
  onTargetHover: noop,
  onTargetLeave: noop,
  onLinkClick: noop,
  onMoreClick: noop,
  isNoMore: false,
  activeItem: ``,
  setDefaultFilter: noop,
  allGenres: [
    {
      id: `id1`,
      title: `id1`,
    },
    {
      id: `id2`,
      title: `id2`,
    },
  ],
};


describe(`Render FilmList component`, () => {
  it(`Render full FilmList component`, () => {
    const initialState = {
      currentFilm: films[0],
    };

    const store = mockStore(initialState);

    const tree = renderer
      .create(
          <Provider store = {store}>
            <FilmList
              {...commonProps}
              listType = {`FULL`}
              hasGenresList
              hasMoreButton
            />
          </Provider>, {
            createNodeMock: createVideoMock})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render "look like" FilmList component`, () => {
    const initialState = {
      currentFilm: films[0],
    };

    const store = mockStore(initialState);

    const tree = renderer
      .create(
          <Provider store = {store}>
            <FilmList
              {...commonProps}
              listType = {`LOOK_LIKE`}
            />
          </Provider>, {
            createNodeMock: createVideoMock})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render "favorite" FilmList component`, () => {
    const initialState = {
      currentFilm: films[0],
    };

    const store = mockStore(initialState);

    const tree = renderer
      .create(
          <Provider store = {store}>
            <FilmList
              {...commonProps}
              listType = {`FAVORIE`}
            />
          </Provider>, {
            createNodeMock: createVideoMock})
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- components/film-list/film-list.test
