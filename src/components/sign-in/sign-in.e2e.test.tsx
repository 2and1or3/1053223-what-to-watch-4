import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SignIn from './sign-in';

Enzyme.configure({adapter: new Adapter()});

describe(`SignIn component`, () => {
  it(`onAuthSubmit recieves login and password`, () => {
    const login = `keks@gmail.com`;
    const password = `password`;

    const mockSubmitHandler = jest.fn();
    const formSendPrevention = jest.fn();

    const wrapper = Enzyme.mount(<SignIn onAuthSubmit = {mockSubmitHandler}/>, {disableLifecycleMethods: true});

    const form = wrapper.find(`.sign-in__form`);
    const loginField = wrapper.find(`#user-email`);
    const passwordField = wrapper.find(`#user-password`);

    loginField.instance().value = login;
    passwordField.instance().value = password;

    form.simulate(`submit`, {preventDefault: formSendPrevention});

    expect(formSendPrevention).toHaveBeenCalledTimes(1);
    expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
    expect(mockSubmitHandler).toHaveBeenCalledWith(login, password, expect.anything());
  });
});

// npm run test.jest -- components/sign-in/sign-in.e2e.test
