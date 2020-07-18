import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";

import {UserBlock} from './user-block.jsx';


describe(`Render UserBlock component`, () => {
  it(`Without auth`, () => {
    const tree = renderer
    .create(
        <BrowserRouter>
          <UserBlock authStatus = {`NO_AUTH`}/>
        </BrowserRouter>
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`With auth`, () => {
    const tree = renderer
      .create(
          <BrowserRouter>
            <UserBlock authStatus = {`AUTH`}/>
          </BrowserRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- components/user-block/user-block.test.js
