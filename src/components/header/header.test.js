import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import Header from './header.jsx';

const middlewares = [];

const mockStore = configureStore(middlewares);


const film = {
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
};

const children = <div/>;

const commonProps = {
  film,
  isFull: true,
  onPlayClick: () => {},
};

describe(`Render Header component`, () => {
  it(`Render full Header component`, () => {
    const initialState = {};
    const store = mockStore(initialState);


    const tree = renderer
      .create(
          <Provider store = {store}>
            <Header
              {...commonProps}
              isFull = {true}>
              {children}
            </Header>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render short Header component`, () => {
    const initialState = {};
    const store = mockStore(initialState);


    const tree = renderer
      .create(
          <Provider store = {store}>
            <Header
              {...commonProps}
              isFull = {false}>
              {children}
            </Header>
          </Provider>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
