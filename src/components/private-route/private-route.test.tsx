import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import {PrivateRoute} from './private-route';
import {noop} from '../../utils';

it(`Render PrivateRoute component`, () => {
  const tree = renderer
    .create(
        <BrowserRouter>
          <PrivateRoute
            exact
            path = {`some path`}
            render = {noop}
            userStatus = {`AUTH`}
            allowForUserStatus = {`AUTH`}
            redirectTo = {`/login`}
          />
        </BrowserRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- components/private-route/private-route.test
