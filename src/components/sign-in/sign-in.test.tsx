import * as React from "react";
import * as renderer from "react-test-renderer";

import SignIn from './sign-in';
import {noop} from '../../utils';

it(`Render SignIn component`, () => {
  const tree = renderer
    .create(<SignIn onAuthSubmit = {noop}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/sign-in/sign-in.test
