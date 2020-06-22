import React from "react";
import renderer from "react-test-renderer";

import FilmList from './film-list.jsx';

const films = [
  {
    id: `0`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Drama`,
    release: `2014`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    rating: 8.9,
    voiceCount: 240,
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: `1`,
    title: `the Grand Budapest Hotel`,
    preview: `img/bohemian-rhapsody.jpg`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Drama`,
    release: `2014`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    rating: 8.9,
    voiceCount: 240,
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  },
  {
    id: `2`,
    title: `Macbeth`,
    preview: `img/macbeth.jpg`,
    background: `img/bg-the-grand-budapest-hotel.jpg`,
    cover: `img/the-grand-budapest-hotel-poster.jpg`,
    genre: `Drama`,
    release: `2014`,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
    rating: 8.9,
    voiceCount: 240,
    director: `Wes Andreson`,
    actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  }];

it(`Render FilmList component`, () => {
  const tree = renderer
    .create(<FilmList films = {films} onCardClick = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
