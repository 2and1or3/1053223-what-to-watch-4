import React from "react";
import renderer from "react-test-renderer";

import Footer from './footer';

it(`Render Footer component`, () => {
  const tree = renderer
    .create(
        <Footer />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/footer/footer.test
