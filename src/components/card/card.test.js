import React from "react";
import renderer from "react-test-renderer";

import Card from './card.jsx';

const film = {
  title: `Fantastic Beasts`,
};

it(`Render Card component`, () => {
  const tree = renderer
    .create(<Card film = {film} onTitleClick = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
