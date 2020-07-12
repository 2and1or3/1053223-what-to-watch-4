import React from "react";
import renderer from "react-test-renderer";

import AddReview from './add-review.jsx';

it(`Render AddReview component`, () => {
  const tree = renderer
    .create(
        <AddReview onCommentSend = {() => {}}/>, {
          createNodeMock: (element) => element,
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
