import React from "react";
import renderer from "react-test-renderer";

import SignIn from './sign-in';

it(`Render SignIn component`, () => {
  const tree = renderer
    .create(<SignIn onAuthSubmit = {() => {}}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/sign-in/sign-in.test
