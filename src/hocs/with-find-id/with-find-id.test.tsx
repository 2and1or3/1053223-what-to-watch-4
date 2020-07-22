import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import withFindId from './with-find-id';
import {FilmType} from '../../types';
import NameSpace from '../../reducer/namespace';

const mockStore = configureStore();

interface MockProps {
  currentFilm: FilmType;
}

const MockComponent: React.FunctionComponent<MockProps> = (props: MockProps) => {
  const {currentFilm} = props;

  return (
    <div>
      {JSON.stringify(currentFilm)}
    </div>
  );
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

// npm run test.jest -- hocs/with-find-id/with-find-id.test
