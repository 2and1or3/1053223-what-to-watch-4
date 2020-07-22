import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import {PrivateRoute} from './private-route';

it(`Render PrivateRoute component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <PrivateRoute
            exact
            path = {`some path`}
            render = {() => {}}
            userStatus = {`AUTH`}
            allowForUserStatus = {`AUTH`}
            redirectTo = {`/login`}
          />
        </BrowserRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/private-route/private-route.test
