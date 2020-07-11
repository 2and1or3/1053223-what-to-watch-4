import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {PureComponent} from "react";
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';
import PlayerScreen from '../player-screen/player-screen.jsx';
import withVideo from '../../hocs/with-video/with-video.js';

import {filmProp} from '../../props.js';
import {ScreenType} from '../../consts.js';
import {ActionCreator} from '../../reducer/application/application.js';
import {getScreen, getCurrentFilm} from '../../reducer/application/selectors.js';

const PlayerScreenWithVideo = withVideo(PlayerScreen);


class App extends PureComponent {
  _renderApp() {
    const {screen, currentFilm, onExit} = this.props;

    switch (screen) {
      case ScreenType.MAIN:
        return (
          <Main
            promoFilm = {currentFilm}
          />);
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
    }

    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
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
};

const mapStateToProps = (state) => ({
  screen: getScreen(state),
  currentFilm: getCurrentFilm(state),
});

const mapDispatchToProps = (dispatch) => ({
  onExit: () => {
    dispatch(ActionCreator.changeScreen(ScreenType.MAIN));
  }
});

const ConectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


export {App};
export default ConectedApp;
