import * as React from "react";
import * as renderer from "react-test-renderer";

import AlertError from './alert-error';
import {noop} from '../../utils';

describe(`Render AlertError component`, () => {
  it(`Render AlertError with error`, () => {
    const tree = renderer
      .create(<AlertError message = {`Server is unavailable`} code = {`503`} onClose = {noop}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render AlertError without error`, () => {
    const tree = renderer
      .create(<AlertError message = {``} code = {``} onClose = {noop}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

// npm run test.jest -- components/alert-error/alert-error.test
