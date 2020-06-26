import React from "react";

import {filmProp} from '../../props.js';

const getRunTimeFormat = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const min = minutes - hours * 60;

  return `${hours}h ${min}m`;
};


const Details = (props) => {
  const {film} = props;
  const {director, actors, duration, genre, release} = film;

  const runTime = getRunTimeFormat(duration);
  const actorsMarkup = actors
  .map((actor, i, arr) => {
    return <React.Fragment key={actor}>
      {`${actor}${i !== arr.length - 1 ? `,` : ``}`}
      <br></br>
    </React.Fragment>;
  });

  return (
    <div className="movie-card__text movie-card__row">
      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Director</strong>
          <span className="movie-card__details-value">{director}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Starring</strong>
          <span className="movie-card__details-value">
            {actorsMarkup}
          </span>
        </p>
      </div>

      <div className="movie-card__text-col">
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Run Time</strong>
          <span className="movie-card__details-value">{runTime}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Genre</strong>
          <span className="movie-card__details-value">{genre}</span>
        </p>
        <p className="movie-card__details-item">
          <strong className="movie-card__details-name">Released</strong>
          <span className="movie-card__details-value">{release}</span>
        </p>
      </div>
    </div>
  );
};

Details.propTypes = {
  film: filmProp,
};

export default Details;
