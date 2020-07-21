import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PlayerScreen from './player-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

const film = {
  id: `1`,
  title: `the Grand Budapest Hotel`,
  poster: `img/bohemian-rhapsody.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
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

const children = <div/>;

const commonProps = {
  currentFilm: film,
  onPlayClick: () => {},
  progress: 5,
  isPlaying: false,
  onFullScreen: () => {},
  onToggleMove: () => {},
  togglerPosition: 5,
};

describe(`PlayerScreen component`, () => {
  const mockPlayClick = jest.fn();
  const mockFullScreenClick = jest.fn();

  it(`Buttons play/pause and onExit are clickable`, () => {
    const wrapper = Enzyme.mount(
        <PlayerScreen
          {... commonProps}
          containerRef = {React.createRef()}
          progressRef = {React.createRef()}
          onPlayClick = {mockPlayClick}
          onFullScreen = {mockFullScreenClick}
        >
          {children}
        </PlayerScreen>
    );

    const playButton = wrapper.find(`.player__play`);
    const exitButton = wrapper.find(`.player__full-screen`);

    playButton.simulate(`click`);
    exitButton.simulate(`click`);

    expect(mockPlayClick).toHaveBeenCalledTimes(1);
    expect(mockFullScreenClick).toHaveBeenCalledTimes(1);
  });

});

// npm run test.jest -- components/player-screen/player-screen.e2e.test.js
