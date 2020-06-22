import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
  const {film, onTitleClick, onHover} = props;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={() => {
        onHover(film);
      }}>
      <div className="small-movie-card__image">
        <img src={film.preview} alt={film.title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html" onClick={onTitleClick}>{film.title}</a>
      </h3>
    </article>
  );
};

Card.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default Card;
