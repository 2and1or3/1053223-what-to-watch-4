import React from "react";
import renderer from "react-test-renderer";

import AlertError from './alert-error.jsx';

describe(`Render AlertError component`, () => {
  it(`Render AlertError with error`, () => {
    const tree = renderer
      .create(<AlertError message = {`Server is unavailable`} code = {`503`} onClose = {() => {}}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`Render AlertError without error`, () => {
    const tree = renderer
      .create(<AlertError message = {``} code = {``} onClose = {() => {}}/>)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
