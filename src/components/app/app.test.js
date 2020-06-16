import React from "react";
import renderer from "react-test-renderer";

import App from './app.jsx';

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

it(`Render App component`, () => {
  const tree = renderer
    .create(<App
      promoTitle = {promoFilm.title}
      promoGenres = {promoFilm.genres}
      promoRelease = {promoFilm.release}
      films = {films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
