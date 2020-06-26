import React from "react";

import {filmProp} from '../../props.js';

const RatingTitles = {
  BAD: `bad`,
  NORMAL: `normal`,
  GOOD: `good`,
  VERY_GOOD: `very good`,
  AWSOME: `awsome`,
};

const RatingMinEdges = {
  0: RatingTitles.BAD,
  3: RatingTitles.NORMAL,
  5: RatingTitles.GOOD,
  8: RatingTitles.VERY_GOOD,
  10: RatingTitles.AWSOME,
};

const getRatingTitle = (rating) => {
  let title = null;

  for (const edge in RatingMinEdges) {
    if (rating >= edge) {
      title = RatingMinEdges[edge];
    }
  }

  return title;
};

const ACTORS_SHORT_LIST_COUNT = 4;


const Overview = (props) => {
  const {rating, voiceCount, description, director, actors} = props.film;

  const ratingTitle = getRatingTitle(rating);

  return (
    <React.Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingTitle}</span>
          <span className="movie-rating__count">{voiceCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {actors.slice(0, ACTORS_SHORT_LIST_COUNT).join(`, `)} and other</strong></p>
      </div>
    </React.Fragment>);
};

Overview.propTypes = {
  film: filmProp,
};

export default Overview;
