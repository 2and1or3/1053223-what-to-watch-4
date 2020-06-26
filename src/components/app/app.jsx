import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {PureComponent} from "react";

import Main from '../main/main.jsx';
import FilmDetails from '../film-details/film-details.jsx';

import {filmProp} from '../../props.js';

const ScreenTypes = {
  MAIN: `main`,
  DETAILS: `details`,
};


class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      screen: ScreenTypes.MAIN,
      currentFilm: null,
    };

    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _handleCardClick(film) {
    this.setState({
      screen: ScreenTypes.DETAILS,
      currentFilm: film,
    });
  }

  _renderApp() {
    const {promoTitle, promoGenres, promoRelease, films} = this.props;
    const screen = this.state.screen;

    switch (screen) {
      case ScreenTypes.MAIN:
        return (
          <Main
            title = {promoTitle}
            genres = {promoGenres}
            release = {promoRelease}
            films = {films}
            onCardClick = {this._handleCardClick}
          />);
      case ScreenTypes.DETAILS:
        return (
          <FilmDetails currentFilm = {this.state.currentFilm} films = {films} onCardClick = {this._handleCardClick}/>
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
            <FilmDetails currentFilm = {films[1]} films = {films} onCardClick = {() => {}}/>
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
  films: PropTypes.arrayOf(filmProp).isRequired,
};

export default App;
