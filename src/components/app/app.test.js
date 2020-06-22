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
