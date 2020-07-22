import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";

import Head from './head';
import NameSpace from '../../reducer/namespace';

const mockStore = configureStore();

describe(`Render full Head component`, () => {
  it(`Render full Head component without auth`, () => {
    const initialState = {
      [NameSpace.USER]: {
        authStatus: `NO_AUTH`,
      },
    };

    const store = mockStore(initialState);

    const tree = renderer
      .create(
          <Provider store = {store}>
            <BrowserRouter>
              <Head hasUser hasTitle = {`some title`}/>
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render full Head component with auth`, () => {
    const initialState = {
      [NameSpace.USER]: {
        authStatus: `AUTH`,
      },
    };

    const store = mockStore(initialState);

    const tree = renderer
      .create(
          <Provider store = {store}>
            <BrowserRouter>
              <Head hasUser hasTitle = {`some title`}/>
            </BrowserRouter>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- components/head/head.test
