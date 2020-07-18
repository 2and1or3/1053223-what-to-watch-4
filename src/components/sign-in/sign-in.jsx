import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

import history from '../../history.js';

import Footer from '../footer/footer.jsx';
import Head from '../head/head.jsx';

const SIGN_IN_TITLE = `Sign in`;

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this._loginRef = React.createRef();
    this._passwordRef = React.createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleSubmitSuccess = this._handleSubmitSuccess.bind(this);
  }

  _handleSubmitSuccess() {
    history.push(`/`);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const {onAuthSubmit} = this.props;

    const login = this._loginRef.current.value;
    const password = this._passwordRef.current.value;

    onAuthSubmit(login, password, this._handleSubmitSuccess);
  }

  render() {

    return (
      <div className="user-page">
        <Head authStatus = {false} hasTitle = {SIGN_IN_TITLE}/>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._handleSubmit}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input ref={this._loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={this._passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

SignIn.propTypes = {
  onAuthSubmit: PropTypes.func.isRequired,
};

export default SignIn;
