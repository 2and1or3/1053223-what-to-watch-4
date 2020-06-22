import React from "react";
import renderer from "react-test-renderer";

import FilmDetails from './film-details.jsx';

const film = {
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
};

it(`Render FilmDetails component`, () => {
  const tree = renderer
  .create(<FilmDetails film = {film}/>)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
