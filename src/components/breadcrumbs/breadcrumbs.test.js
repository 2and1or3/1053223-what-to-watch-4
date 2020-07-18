import React from "react";
import renderer from "react-test-renderer";

import BreadCrumbs from './breadcrumbs.jsx';

it(`Render BreadCrumbs component`, () => {
  const tree = renderer
    .create(
        <BreadCrumbs title = {`some title`}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/breadcrumbs/breadcrumbs.test.js
