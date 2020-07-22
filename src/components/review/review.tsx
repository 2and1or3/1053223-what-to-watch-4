import * as React from "react";

import {CommentType} from '../../types';
import {getDateFormat} from '../../utils';

interface Props {
  comment: CommentType;
}

const Review: React.FunctionComponent<Props> = (props: Props) => {
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

export default Review;
