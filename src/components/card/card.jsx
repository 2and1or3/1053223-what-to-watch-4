import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
  const {film} = props;

  return <React.Fragment>
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href="movie-page.html">{film.title}</a>
      </h3>
    </article>
  </React.Fragment>;
};

Card.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
