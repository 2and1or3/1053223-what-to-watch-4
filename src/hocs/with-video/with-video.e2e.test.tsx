import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import withVideo from './with-video';
import {FilmType} from '../../types';

Enzyme.configure({adapter: new Adapter()});

const film: FilmType = {
  id: `1`,
  title: `the Grand Budapest Hotel`,
  poster: `img/bohemian-rhapsody.jpg`,
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  background: `img/bg-the-grand-budapest-hotel.jpg`,
  backgroundColor: `#000`,
  cover: `img/the-grand-budapest-hotel-poster.jpg`,
  isFavorite: false,
  src: `path`,
  duration: 99,
  genre: `Drama`,
  release: `2014`,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  voiceCount: 240,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
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

describe(`VideoPlayer component`, () => {
  it(`VideoPlayer has playback state`, () => {
    const wrapper = shallow(<MockComponentWithVideo
      isPlaying = {true}
      currentFilm = {film}
      isMuted = {true}/>,
    {disableLifecycleMethods: true});

    expect(wrapper.state(`isPlaying`)).toBe(true);
  });

  it(`VideoPlayer has pause state`, () => {
    const wrapper = shallow(<MockComponentWithVideo
      isPlaying = {false}
      currentFilm = {film}
      isMuted = {true}/>,
    {disableLifecycleMethods: true});

    expect(wrapper.state(`isPlaying`)).toBe(false);
  });
});
