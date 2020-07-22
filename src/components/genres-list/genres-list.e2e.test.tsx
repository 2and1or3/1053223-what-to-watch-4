import * as React from "react";
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

import GenresList from './genres-list';
import {GenreType} from '../../types';
import {noop} from '../../utils';

Enzyme.configure({adapter: new Adapter()});

const genres: GenreType[] = [
  {
    id: `all`,
    title: `All genres`,
  },
  {
    id: `second`,
    title: `second`,
  }
];

it(`onLinkClick recieves correct genre`, () => {
  const mockLinkClick = jest.fn();


  const wrapper = Enzyme.shallow(<GenresList onTargetClick = {noop} onLinkClick = {mockLinkClick} genres = {genres} activeItem = {``}/>);

  const secondGenre = wrapper.find(`.catalog__genres-link`).at(1);

  secondGenre.simulate(`click`);

  expect(mockLinkClick).toHaveBeenCalledTimes(1);
  expect(mockLinkClick).toHaveBeenCalledWith(genres[1].id);
});

// npm run test.jest -- components/genres-list/genres-list.e2e.test
