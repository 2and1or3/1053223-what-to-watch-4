import React from "react";

import {commentProp} from '../../props.js';
import {getDateFormat} from '../../utils.js';

const Review = (props) => {
  const {description, author, date, rate} = props.comment;
  const formatedDate = getDateFormat(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{description}</p>

        <footer className="review__details">
          <cite className="review__author">{author}</cite>
          <time className="review__date" dateTime="2016-12-24">{formatedDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rate}</div>
    </div>
  );
};

Review.propTypes = {
  comment: commentProp,
};

export default Review;
