import React from "react";
import PropTypes from "prop-types";

import {filmProp} from '../../props.js';


const Card = (props) => {
  const {film, onCardClick, onHover, renderPlayer, onCardHover, onCardLeave} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onHover(film);
        onCardHover();
      }}
      onMouseLeave={() => {
        onCardLeave();
      }}>
      <div
        className="small-movie-card__image"
        onClick={(evt) => {
          evt.preventDefault();
          onCardClick(film);
        }}>
        {renderPlayer(film, true)}
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
  onHover: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardLeave: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default Card;
