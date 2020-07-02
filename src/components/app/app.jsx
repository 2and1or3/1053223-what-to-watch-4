import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {PureComponent} from "react";
import {connect} from "react-redux";

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';

import {filmProp} from '../../props.js';
import {ScreenType} from '../../consts.js';


class App extends PureComponent {
  _renderApp() {
    const {promoTitle, promoGenres, promoRelease, screen, currentFilm} = this.props;

    switch (screen) {
      case ScreenType.MAIN:
        return (
          <Main
            title = {promoTitle}
            genres = {promoGenres}
            release = {promoRelease}
          />);
      case ScreenType.DETAILS:
        return (
          <FilmDetails currentFilm = {currentFilm}/>
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
  promoTitle: PropTypes.string.isRequired,
  promoGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  promoRelease: PropTypes.number.isRequired,
  screen: PropTypes.string.isRequired,
  currentFilm: PropTypes.shape(filmProp),
  films: PropTypes.arrayOf(filmProp).isRequired,
};

const mapStateToProps = (state) => ({
  screen: state.screen,
  currentFilm: state.currentFilm,
  films: state.films,
});

const ConectedApp = connect(mapStateToProps, null)(App);


export {App};
export default ConectedApp;
