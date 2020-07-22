import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ShowMore from './show-more';

Enzyme.configure({adapter: new Adapter()});

it(`ShowMore button is clickable`, () => {
  const mockClick = jest.fn();

  const wrapper = Enzyme.shallow(<ShowMore onMoreClick = {mockClick}/>);

  wrapper.find(`.catalog__button`).simulate(`click`);

  expect(mockClick).toHaveBeenCalledTimes(1);
});

// npm run test.jest -- components/show-more/show-more.e2e.test
