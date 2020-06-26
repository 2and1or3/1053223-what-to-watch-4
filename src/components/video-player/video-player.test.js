import React from "react";
import renderer from "react-test-renderer";

import VideoPlayer from './video-player.jsx';

const film = {
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
  commentIds: [`0`, `1`, `2`, `3`, `4`, `5`],
};

it(`Render VideoPlayer component`, () => {
  const tree = renderer
  .create(<VideoPlayer isPlaying = {true} film = {film} isMuted = {true}/>, {
    createNodeMock: (element) => {
      if (element.type === `video`) {
        return element;
      }

      return null;
    }
  })
  .toJSON();

  expect(tree).toMatchSnapshot();
});
