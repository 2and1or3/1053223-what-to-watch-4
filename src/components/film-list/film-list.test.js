import React from "react";
import renderer from "react-test-renderer";

import FilmList from './film-list.jsx';

const films = [
  {
    id: `0`,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    id: `1`,
    title: `Bohemian Rhapsody`,
    preview: `img/bohemian-rhapsody.jpg`,
  },
  {
    id: `2`,
    title: `Macbeth`,
    preview: `img/macbeth.jpg`,
  }];

it(`Render FilmList component`, () => {
  const tree = renderer
    .create(<FilmList films = {films}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
