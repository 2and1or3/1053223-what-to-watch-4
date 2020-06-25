import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import VideoPlayer from './video-player.jsx';

Enzyme.configure({adapter: new Adapter()});

const film = {
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
};

describe(`VideoPlayer component`, () => {
  it(`VideoPlayer has playback state`, () => {
    const wrapper = shallow(<VideoPlayer
      isPlaying = {true}
      film = {film}
      isMuted = {true}/>,
    {disableLifecycleMethods: true});

    expect(wrapper.state(`isPlaying`)).toBe(true);
  });

  it(`VideoPlayer has pause state`, () => {
    const wrapper = shallow(<VideoPlayer
      isPlaying = {false}
      film = {film}
      isMuted = {true}/>,
    {disableLifecycleMethods: true});

    expect(wrapper.state(`isPlaying`)).toBe(false);
  });
});