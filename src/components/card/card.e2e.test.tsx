import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import Card from './card';
import {FilmType} from '../../types';
import {noop} from '../../utils';

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
  genre: `Drama`,
  release: `2014`,
  duration: 99,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.`,
  rating: 8.9,
  voiceCount: 240,
  director: `Wes Andreson`,
  actors: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
};

const mockEvent = {
  preventDefault: noop,
};

describe(`Card component`, () => {
  it(`Title and img of card is clickable`, () => {
    const onClick = jest.fn();

    const wrapper = shallow(
        <Card
          currentFilm = {film}
          onCardClick = {onClick}
          onCardHover = {noop}
          onCardLeave = {noop}>[]
        </Card>);
    wrapper.find(`.small-movie-card__link`).simulate(`click`, mockEvent);
    wrapper.find(`.small-movie-card__image`).simulate(`click`, mockEvent);

    expect(onClick).toHaveBeenCalledTimes(2);

    expect(onClick.mock.calls[0][0]).toMatchObject(film);
  });

  it(`When card is hovered callback receives correct film`, (done) => {
    function onCardHover(data) {
      try {
        expect(data).toEqual(film);
        done();
      } catch (error) {
        done(error);
      }
    }

    const wrapper = shallow(
        <Card
          currentFilm = {film}
          onCardClick = {noop}
          onCardHover = {onCardHover}
          onCardLeave = {noop}>[]
        </Card>);
    wrapper.find(`.small-movie-card`).simulate(`mouseenter`);
  });
});
