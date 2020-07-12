import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {PureComponent} from "react";
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import PlayerScreen from '../player-screen/player-screen.jsx';
import AlertError from '../alert-error/alert-error.jsx';
import SignIn from '../sign-in/sign-in.jsx';

import {filmProp} from '../../props.js';
import {ScreenType} from '../../consts.js';
import withVideo from '../../hocs/with-video/with-video.js';
import {ActionCreator as ApplicationActionCreator} from '../../reducer/application/application.js';
import {getScreen, getCurrentFilm, getError} from '../../reducer/application/selectors.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';

const PlayerScreenWithVideo = withVideo(PlayerScreen);


class App extends PureComponent {
  _renderApp() {
    const {screen, currentFilm, onExit, onAuthSubmit} = this.props;

    switch (screen) {
      case ScreenType.MAIN:
        return (
          <Main
            promoFilm = {currentFilm}
          />
        );

      case ScreenType.DETAILS:
        return (
          <FilmDetails currentFilm = {currentFilm}/>
        );

      case ScreenType.PLAYER:
        return (
          <PlayerScreenWithVideo
            film = {currentFilm}
            isPlaying = {true}
            isMuted = {false}
            onExit = {onExit}
          />
        );

      case ScreenType.SIGN:
        return (
          <SignIn onAuthSubmit = {onAuthSubmit}/>
        );
    }

    return null;
  }

  render() {
    const {error, onClose} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
            <AlertError message = {error.message} code = {error.code} onClose = {onClose}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  screen: PropTypes.string.isRequired,
  currentFilm: filmProp,
  onExit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onAuthSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  screen: getScreen(state),
  currentFilm: getCurrentFilm(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onExit: () => {
    dispatch(ApplicationActionCreator.changeScreen(ScreenType.MAIN));
  },
  onClose: () => {
    dispatch(ApplicationActionCreator.showError(``, ``));
  },
  onAuthSubmit: (login, password) => {
    dispatch(UserOperation.sendAuth(login, password));
  }
});

const ConectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


export {App};
export default ConectedApp;
