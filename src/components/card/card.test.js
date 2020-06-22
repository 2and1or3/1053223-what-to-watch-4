import React from "react";
import renderer from "react-test-renderer";

import Card from './card.jsx';

const film = {
  id: `0`,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  preview: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`Render Card component`, () => {
  const tree = renderer
    .create(<Card film = {film} onTitleClick = {() => {}} onHover = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
