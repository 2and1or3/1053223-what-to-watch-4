import * as React from "react";
import * as renderer from "react-test-renderer";

import {Reviews} from './reviews';
import {CommentType} from '../../types';
import {noop} from '../../utils';

const comments: CommentType[] = [{
  id: `0`,
  author: `Kate Muir`,
  date: `Month dd, yyyy`,
  description: `The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.`,
  rate: `8,9`,
},
{
  id: `1`,
  author: `Bill Goodykoontz`,
  date: `Month dd, yyyy`,
  description: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
  rate: `7,3`,
},
{
  id: `2`,
  author: `Amanda Greever`,
  date: `Month dd, yyyy`,
  description: `It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.`,
  rate: `7,4`,
}];


it(`Render Reviews component`, () => {
  const tree = renderer
    .create(<Reviews comments = {comments} filmId = {`1`} loadComments = {noop}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/reviews/reviews.test
