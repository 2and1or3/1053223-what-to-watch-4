import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {shallow} from "enzyme";

import Card from './card.jsx';

Enzyme.configure({adapter: new Adapter()});

const film = {
  title: `Fantastic Beasts`,
};

describe(`Card component`, () => {
  it(`Title of card is clickable`, () => {
    const onClick = jest.fn();

    const wrapper = shallow(<Card film = {film} onTitleClick = {onClick}/>);
    wrapper.find(`.small-movie-card__link`).simulate(`click`);

    expect(onClick.mock.calls.length).toBe(1);
  });
});
