import * as React from "react";
import * as renderer from "react-test-renderer";

import ShowMore from './show-more';
import {noop} from '../../utils';

it(`Render ShowMore component`, () => {
  const tree = renderer
    .create(<ShowMore onMoreClick = {noop} hide = {false}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/show-more/show-more.test
