import React from "react";
import renderer from "react-test-renderer";

import ShowMore from './show-more';

it(`Render ShowMore component`, () => {
  const tree = renderer
    .create(<ShowMore onMoreClick = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/show-more/show-more.test
