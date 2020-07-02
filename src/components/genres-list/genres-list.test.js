import React from "react";
import renderer from "react-test-renderer";

import GenresList from './genres-list.jsx';

it(`Render GenresList component`, () => {
  const tree = renderer
    .create(<GenresList currentGenre = {`all`} onLinkClick = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
