import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import AddReview from './add-review';
import NameSpace from '../../reducer/namespace';

const mockStore = configureStore();

const film = {
  id: `0`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
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
};

it(`Render AddReview component`, () => {
  const initialState = {
    [NameSpace.USER]: {
      authStatus: `Auth`,
    }
  };

  const store = mockStore(initialState);

  const tree = renderer
    .create(
        <Provider store = {store}>
          <BrowserRouter>
            <AddReview currentFilm = {film} onCommentSend = {() => {}}/>
          </BrowserRouter>
        </Provider>
        , {
          createNodeMock: (element) => element,
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/add-review/add-review.test
