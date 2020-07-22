import * as React from "react";
import * as renderer from "react-test-renderer";

import Review from './review';
import {CommentType} from '../../types';

const comment: CommentType = {
  id: `0`,
  author: `Kate Muir`,
  date: `Month dd, yyyy`,
  description: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rate: `8,9`,
};

it(`Render Review component`, () => {
  const tree = renderer
    .create(<Review comment = {comment}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/review/review.test
