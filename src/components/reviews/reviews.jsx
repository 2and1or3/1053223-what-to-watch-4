import React from "react";
import PropTypes from "prop-types";

import Review from '../review/review.jsx';

import {commentProp} from '../../props.js';


const Reviews = (props) => {
  const {comments} = props;

  const commentsMiddle = Math.round(comments.length / 2);
  const commentsForFirstCol = comments.slice(0, commentsMiddle);
  const commentsForSecondCol = comments.slice(commentsMiddle);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {commentsForFirstCol.map((comment) => <Review key = {comment.id} comment = {comment}/>)}
      </div>
      <div className="movie-card__reviews-col">
        {commentsForSecondCol.map((comment) => <Review key = {comment.id} comment = {comment}/>)}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  comments: PropTypes.arrayOf(commentProp),
};

export default Reviews;
