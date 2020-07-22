import * as React from "react";
import * as renderer from "react-test-renderer";

import GenresList from './genres-list';
import {GenreType} from '../../types';
import {noop} from '../../utils';

const genres: GenreType[] = [
  {
    id: `id1`,
    title: `id1`,
  },
  {
    id: `id2`,
    title: `id2`,
  },
];

it(`Render GenresList component`, () => {
  const tree = renderer
    .create(<GenresList activeItem = {`all`} onLinkClick = {noop} onTargetClick = {noop} genres = {genres}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/genres-list/genres-list.test
