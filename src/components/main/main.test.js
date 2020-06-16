import React from "react";
import renderer from "react-test-renderer";

import Main from './main.jsx';

const promoFilm = {
  title: `The Grand Budapest Hotel`,
  genres: [`Drama`],
  release: 2014,
};

const films = [
  {
    title: `Fantastic Beasts`,
  },
  {
    title: `Bohemian Rhapsody`,
  },
  {
    title: `Macbeth`,
  }];

it(`Render Main component`, () => {
  const tree = renderer
    .create(<Main
      title = {promoFilm.title}
      genres = {promoFilm.genres}
      release = {promoFilm.release}
      films = {films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
