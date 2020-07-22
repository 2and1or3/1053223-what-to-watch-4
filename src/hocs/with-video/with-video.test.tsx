import * as React from "react";
import * as renderer from "react-test-renderer";

import {createVideoMock} from '../../utils';
import withVideo from './with-video';
import {FilmType} from '../../types';

const film: FilmType = {
  id: `0`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#000`,
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

interface MockProps {
  children: React.ReactNode;
}

const MockComponent: React.FunctionComponent<MockProps> = (props: MockProps) => {
  const {children} = props;
  return (
    <div>
      {children}
    </div>
  );
};

const MockComponentWithVideo = withVideo(MockComponent);

it(`Render Component with video`, () => {
  const tree = renderer
  .create(
      <MockComponentWithVideo
        currentFilm = {film}
        isMuted = {true}
        isPlaying = {false}
      />, {
        createNodeMock: createVideoMock
      })
  .toJSON();

  expect(tree).toMatchSnapshot();
});
