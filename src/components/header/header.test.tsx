import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";

import Header from './header';
import NameSpace from '../../reducer/namespace';
import {FilmType} from '../../types';
import {noop} from '../../utils';

const mockStore = configureStore();


const film: FilmType = {
  id: `1`,
  title: `the Grand Budapest Hotel`,
  poster: `img/bohemian-rhapsody.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#000`,
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
};

const children = <div/>;

const commonProps = {
  film,
  isFull: true,
  onPlayClick: noop,
};

describe(`Render Header component`, () => {
  it(`Render full Header component`, () => {
    const initialState = {
      [NameSpace.USER]: {
        authStatus: `NO_AUTH`,
      },
    };
    const store = mockStore(initialState);


    const tree = renderer
      .create(
          <Provider store = {store}>
            <BrowserRouter>
              <Header
                {...commonProps}
                isFull = {true}>
                {children}
              </Header>
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render short Header component`, () => {
    const initialState = {
      [NameSpace.USER]: {
        authStatus: `NO_AUTH`,
      },
    };
    const store = mockStore(initialState);


    const tree = renderer
      .create(
          <Provider store = {store}>
            <BrowserRouter>
              <Header
                {...commonProps}
                isFull = {false}>
                {children}
              </Header>
            </BrowserRouter>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- components/header/header.test
