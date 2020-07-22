import * as React from "react";

import history from '../../history';
import {AppRoute} from '../../consts';

import Footer from '../footer/footer';
import Head from '../head/head';

const SIGN_IN_TITLE = `Sign in`;

interface Props {
  onAuthSubmit: (login: string, password: string, onSuccess: () => void) => void;
}

class SignIn extends React.PureComponent<Props> {
  private loginRef: React.RefObject<HTMLInputElement>;
  private passwordRef: React.RefObject<HTMLInputElement>;

  constructor(props) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleSubmitSuccess = this._handleSubmitSuccess.bind(this);
  }

  _handleSubmitSuccess() {
    history.push(AppRoute.ROOT);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const {onAuthSubmit} = this.props;

    const login = this.loginRef.current.value;
    const password = this.passwordRef.current.value;

    onAuthSubmit(login, password, this._handleSubmitSuccess);
  }

  render() {

    return (
      <div className="user-page">
        <Head hasTitle = {SIGN_IN_TITLE}/>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._handleSubmit}>
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input ref={this.loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={this.passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
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

export default SignIn;
