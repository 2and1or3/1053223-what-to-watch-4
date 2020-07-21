import React from "react";
import Enzyme from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import {Router} from "react-router-dom";

import AddReview from './add-review.jsx';
import NameSpace from '../../reducer/namespace.js';
import history from '../../history.js';

Enzyme.configure({adapter: new Adapter()});

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

describe(`AddReview component works correctly`, () => {
  it(`AddReview component pass review object and film id into onCommentSend func`, () => {
    const review = {
      comment: `some very very very long long long long review text for film`,
      rating: `1`,
    };

    const initialState = {
      [NameSpace.USER]: {
        authStatus: `AUTH`,
      }
    };
    const store = mockStore(initialState);
    const mockSend = jest.fn();
    const formSendPrevention = jest.fn();

    const wrapper = Enzyme.mount(
        <Provider store = {store}>
          <Router history = {history}>
            <AddReview onCommentSend = {mockSend} currentFilm = {film}/>
          </Router>
        </Provider>
        , {disableLifecycleMethods: true});

    const form = wrapper.find(`.add-review__form`);
    const textarea = wrapper.find(`.add-review__textarea`);
    const ratingInput = wrapper.find(`.rating__input`).at(review.rating - 1);

    ratingInput.instance().checked = true;
    textarea.instance().value = review.comment;

    form.simulate(`submit`, {
      preventDefault: formSendPrevention,
    });

    expect(formSendPrevention).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenNthCalledWith(1, review, film.id, expect.anything());
  });
});

// npm run test.jest -- components/add-review/add-review.e2e.test.js
