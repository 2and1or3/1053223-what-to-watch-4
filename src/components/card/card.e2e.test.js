import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import Card from './card.jsx';

Enzyme.configure({adapter: new Adapter()});

const film = {
  id: `1`,
  title: `the Grand Budapest Hotel`,
  preview: `img/bohemian-rhapsody.jpg`,
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

const mockEvent = {
  preventDefault() {}
};

describe(`Card component`, () => {
  it(`Title and img of card is clickable`, () => {
    const onClick = jest.fn();

    const wrapper = shallow(<Card film = {film} onCardClick = {onClick} onHover = {() => {}}/>);
    wrapper.find(`.small-movie-card__link`).simulate(`click`, mockEvent);
    wrapper.find(`.small-movie-card__image`).simulate(`click`, mockEvent);

    expect(onClick).toHaveBeenCalledTimes(2);

    expect(onClick.mock.calls[0][0]).toMatchObject(film);
  });

  it(`When card is hovered callback receives correct film`, () => {
    const onHover = jest.fn();

    const wrapper = shallow(<Card film = {film} onCardClick = {() => {}} onHover = {onHover}/>);
    wrapper.find(`.small-movie-card`).simulate(`mouseenter`);

    expect(onHover).toHaveBeenCalledTimes(1);

    expect(onHover.mock.calls[0][0]).toMatchObject(film);
  });
});
