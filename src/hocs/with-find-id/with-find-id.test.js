import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import withFindId from './with-find-id.js';
import {filmProp} from '../../props.js';
import NameSpace from '../../reducer/namespace.js';

const mockStore = configureStore();

const MockComponent = (props) => {
  const {currentFilm} = props;

  return (
    <div>
      {JSON.stringify(currentFilm)}
    </div>
  );
};

MockComponent.propTypes = {
  currentFilm: filmProp,
};

const MockComponentWithFindId = withFindId(MockComponent);

it(`Render component with film found by id or default film`, () => {
  const initialState = {
    [NameSpace.DATA]: {
      films: [],
    }
  };
  const store = mockStore(initialState);

  const tree = renderer
    .create(
        <Provider store = {store}>
          <MockComponentWithFindId />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// npm run test.jest -- hocs/with-find-id/with-find-id.test.js
