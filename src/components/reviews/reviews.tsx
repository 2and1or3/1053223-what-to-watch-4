import * as React from "react";
import {connect} from "react-redux";

import Review from '../review/review';

import {CommentType} from '../../types';
import {Operation} from '../../reducer/data/data';
import {getComments} from '../../reducer/data/selectors';

interface Props {
  comments: CommentType[];
  filmId: string;
  loadComments: (id: string) => void;
}

class Reviews extends React.PureComponent<Props> {

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

const mapStateToProps = (state) => ({
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments: (id) => dispatch(Operation.loadComments(id)),
});

const ConnectedReviews = connect(mapStateToProps, mapDispatchToProps)(Reviews);

export {Reviews};
export default ConnectedReviews;
