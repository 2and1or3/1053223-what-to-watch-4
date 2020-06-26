import React from "react";
import PropTypes from "prop-types";

import {PureComponent} from "react";

import Overview from '../overview/overview.jsx';
import Details from '../details/details.jsx';
import Reviews from '../reviews/reviews.jsx';

import {filmProp, commentProp} from '../../props.js';
import {TABS} from '../../consts.js';

const ACTIVE_CLASS = `movie-nav__item--active`;


class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TABS.OVERVIEW,
    };

  }

  _getActiveClass(tab) {
    if (tab === this.state.currentTab) {
      return ACTIVE_CLASS;
    }

    return ``;
  }

  render() {
    const {film, comments} = this.props;
    const {cover, title} = film;
    let currentTab = null;

    switch (this.state.currentTab) {
      case TABS.OVERVIEW:
        currentTab = <Overview film = {film}/>;
        break;

      case TABS.DETAILS:
        currentTab = <Details film = {film}/>;
        break;

      case TABS.REVIEWS:
        currentTab = <Reviews comments = {comments}/>;
        break;
    }

    return (
      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={cover} alt={`${title} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className={`movie-nav__item ${this._getActiveClass(TABS.OVERVIEW)}`}>
                  <a href="#" className="movie-nav__link" onClick={() => {
                    this.setState({currentTab: TABS.OVERVIEW});
                  }}>Overview</a>
                </li>
                <li className={`movie-nav__item ${this._getActiveClass(TABS.DETAILS)}`}>
                  <a href="#" className="movie-nav__link" onClick={() => {
                    this.setState({currentTab: TABS.DETAILS});
                  }}>Details</a>
                </li>
                <li className={`movie-nav__item ${this._getActiveClass(TABS.REVIEWS)}`}>
                  <a href="#" className="movie-nav__link" onClick={() => {
                    this.setState({currentTab: TABS.REVIEWS});
                  }}>Reviews</a>
                </li>
              </ul>
            </nav>
            {currentTab}
          </div>
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  film: filmProp,
  comments: PropTypes.arrayOf(commentProp),
};

export default Tabs;
