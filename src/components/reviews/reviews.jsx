import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {PureComponent} from "react";

import Review from '../review/review.jsx';

import {commentProp} from '../../props.js';
import {Operation} from '../../reducer/data/data.js';
import {getComments} from '../../reducer/data/selectors.js';


class Reviews extends PureComponent {

  componentDidMount() {
    const {filmId, loadComments} = this.props;
    loadComments(filmId);
  }

  componentDidUpdate(prevProps) {
    const {filmId: beforeId} = prevProps;
    const {filmId: afterId, loadComments} = this.props;

    const isEqual = beforeId === afterId;

    if (!isEqual) {
      loadComments(afterId);
    }
  }

  render() {
    const {comments} = this.props;

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
  }
}

Reviews.propTypes = {
  comments: PropTypes.arrayOf(commentProp),
  filmId: PropTypes.string.isRequired,
  loadComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => dispatch(Operation.loadComments(id)),
});

const ConnectedReviews = connect(mapStateToProps, mapDispatchToProps)(Reviews);

export {Reviews};
export default ConnectedReviews;
