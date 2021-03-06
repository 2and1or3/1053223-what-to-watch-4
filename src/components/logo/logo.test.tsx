import * as React from "react";
import * as renderer from "react-test-renderer";

import Logo from './logo';

it(`Render Logo component`, () => {
  const tree = renderer
    .create(
        <Logo hasLight/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/logo/logo.test
