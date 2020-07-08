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
import {ActionCreator} from '../../reducer.js';

const PlayerScreenWithVideo = withVideo(PlayerScreen);


class App extends PureComponent {
  _renderApp() {
    const {promoFilm, screen, currentFilm, onExit} = this.props;

    switch (screen) {
      case ScreenType.MAIN:
        return (
          <Main
            promoFilm = {promoFilm}
          />);
      case ScreenType.DETAILS:
        return (
          <FilmDetails currentFilm = {currentFilm}/>
        );

      case ScreenType.PLAYER:
        return (
          <PlayerScreenWithVideo
            film = {currentFilm ? currentFilm : promoFilm}
            isPlaying = {true}
            isMuted = {false}
            onExit = {onExit}
          />
        );
    }

    return null;
  }

  render() {
    const {films} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/dev-details">
            <FilmDetails currentFilm = {films[1]} films = {films}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoFilm: filmProp,
  screen: PropTypes.string.isRequired,
  currentFilm: PropTypes.shape(filmProp),
  films: PropTypes.arrayOf(filmProp).isRequired,
  onExit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  screen: state.screen,
  currentFilm: state.currentFilm,
  films: state.films,
});

const mapDispatchToProps = (dispatch) => ({
  onExit: () => {
    dispatch(ActionCreator.changeScreen(ScreenType.MAIN));
  }
});

const ConectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


export {App};
export default ConectedApp;
