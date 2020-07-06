import React from "react";
import PropTypes from "prop-types";

import {filmProp} from '../../props.js';

const PREVIEW_DELAY = 1000;

const Card = (props) => {
  const {film, onCardClick, onCardHover, onCardLeave, children} = props;
  let timerId = null;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        timerId = setTimeout(() => {
          onCardHover(film);
        }, PREVIEW_DELAY);
      }}
      onMouseLeave={() => {
        clearTimeout(timerId);
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
};

Card.propTypes = {
  film: filmProp,
  onCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardLeave: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Card;
