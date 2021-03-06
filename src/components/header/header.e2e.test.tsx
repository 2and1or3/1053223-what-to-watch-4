import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import {Header} from './header';
import {FilmType} from '../../types';

Enzyme.configure({adapter: new Adapter()});

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

it(`onFavoriteToggle recieves film id and toggle status`, () => {
  const mockToggle = jest.fn();

  const wrapper = Enzyme.shallow(<Header film = {film} onFavoriteToggle = {mockToggle} authStatus = {`AUTH`}><div/></Header>);

  const toggleButton = wrapper.find(`.btn--list`);
  toggleButton.simulate(`click`);

  expect(mockToggle).toHaveBeenCalledTimes(1);
  expect(mockToggle).toHaveBeenCalledWith(film.id, +!film.isFavorite);
});

// npm run test.jest -- components/header/header.e2e.test
