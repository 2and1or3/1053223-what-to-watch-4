import React from "react";
import renderer from "react-test-renderer";

import GenresList from './genres-list.jsx';

it(`Render GenresList component`, () => {
  const tree = renderer
    .create(<GenresList activeItem = {`all`} onLinkClick = {() => {}} onTargetClick = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/genres-list/genres-list.test.js
