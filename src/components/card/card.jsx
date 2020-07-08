import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

import {filmProp} from '../../props.js';

const PREVIEW_DELAY = 1000;

class Card extends PureComponent {
  constructor(props) {
    super(props);

    this._timerId = null;
  }

  componentWillUnmount() {
    clearTimeout(this._timerId);
  }

  render() {
    const {film, onCardClick, onCardHover, onCardLeave, children} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          this._timerId = setTimeout(() => {
            onCardHover(film);
          }, PREVIEW_DELAY);
        }}
        onMouseLeave={() => {
          clearTimeout(this._timerId);
          onCardLeave();
        }}>
        <div
          className="small-movie-card__image"
          onClick={(evt) => {
            evt.preventDefault();
            onCardClick(film);
          }}>
          {children}
        </div>
        <h3 className="small-movie-card__title">
          <a
            className="small-movie-card__link"
            href="movie-page.html"
            onClick={(evt) => {
              evt.preventDefault();
              onCardClick(film);
            }}>{film.title}</a>
        </h3>
      </article>
    );
  }
}

Card.propTypes = {
  film: filmProp,
  onCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardLeave: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
