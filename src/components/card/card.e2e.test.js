import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import Card from './card.jsx';

Enzyme.configure({adapter: new Adapter()});

const film = {
  id: `0`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

describe(`Card component`, () => {
  it(`Title of card is clickable`, () => {
    const onClick = jest.fn();

    const wrapper = shallow(<Card film = {film} onTitleClick = {onClick} onHover = {() => {}}/>);
    wrapper.find(`.small-movie-card__link`).simulate(`click`);

    expect(onClick.mock.calls.length).toBe(1);
  });

  it(`When card is hovered callback receives correct film`, () => {
    const onHover = jest.fn();

    const wrapper = shallow(<Card film = {film} onTitleClick = {() => {}} onHover = {onHover}/>);
    wrapper.find(`.small-movie-card`).simulate(`mouseenter`);

    expect(onHover).toHaveBeenCalledTimes(1);

    expect(onHover.mock.calls[0][0]).toMatchObject(film);
  });
});
