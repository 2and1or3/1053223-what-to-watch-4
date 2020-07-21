import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AlertError from './alert-error.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`AlertError component`, () => {
  it(`Close button is clickable`, () => {
    const mockClose = jest.fn();
    const wrapper = Enzyme.shallow(<AlertError message = {`not found`} code = {`404`} onClose = {mockClose}/>);

    const closeButton = wrapper.find(`.error__close`);
    closeButton.simulate(`click`);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});

// npm run test.jest -- components/alert-error/alert-error.e2e.test.js
