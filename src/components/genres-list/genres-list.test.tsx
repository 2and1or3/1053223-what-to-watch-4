import React from "react";
import renderer from "react-test-renderer";

import GenresList from './genres-list';

const genres = [
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
    .create(<GenresList activeItem = {`all`} onLinkClick = {() => {}} onTargetClick = {() => {}} genres = {genres}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/genres-list/genres-list.test
