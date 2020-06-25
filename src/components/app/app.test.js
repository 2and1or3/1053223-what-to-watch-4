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
    poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
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
    poster: `img/bohemian-rhapsody.jpg`,
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
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
    poster: `img/macbeth.jpg`,
    preview: `path-to-video`,
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

it(`Render App component`, () => {
  const tree = renderer
    .create(<App
      promoTitle = {promoFilm.title}
      promoGenres = {promoFilm.genres}
      promoRelease = {promoFilm.release}
      films = {films}
    />, {
      createNodeMock: (element) => {
        if (element.type === `video`) {
          return element;
        }

        return null;
      }})
    .toJSON();

  expect(tree).toMatchSnapshot();
});
