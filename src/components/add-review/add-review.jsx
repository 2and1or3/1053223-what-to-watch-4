import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

import Logo from '../logo/logo.jsx';
import BreadCrumbs from '../breadcrumbs/breadcrumbs.jsx';
import UserBlock from '../user-block/user-block.jsx';

import {filmProp} from '../../props.js';
import history from '../../history.js';

const PostLimit = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 400,
};

const DEFAULT_CHECKED = 3;

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this._inputRefs = [];
    this._textRef = React.createRef();
    this._sendRef = React.createRef();

    this._addRef = this._addRef.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleTextInput = this._handleTextInput.bind(this);
    this._enableForm = this._enableForm.bind(this);

    this._handleResponse = {
      onSuccess: () => {
        this._enableForm();
        history.goBack();
      },

      onError: () => {
        this._enableForm();
      },
    };
  }

  _addRef(ref) {
    this._inputRefs.push(ref);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    const {onCommentSend, currentFilm} = this.props;
    let rating = 0;
    let comment = ``;

    this._inputRefs.map((input) => {
      if (input.checked) {
        rating = input.value;
        comment = this._textRef.current.value;
      }
    });


    if (rating && comment) {
      const review = {
        rating,
        comment,
      };

      onCommentSend(review, currentFilm.id, this._handleResponse);
      this._disableForm();
    }
  }

  _disableForm() {
    this._inputRefs.map((input) => {
      input.disabled = true;
    });

    this._sendRef.current.disabled = true;
    this._textRef.current.disabled = true;
  }

  _enableForm() {
    this._inputRefs.map((input) => {
      input.disabled = false;
    });

    this._textRef.current.disabled = false;
  }

  _handleTextInput() {
    const textarea = this._textRef.current;
    const length = textarea.value.length;

    if (PostLimit.MIN_LENGTH <= length && length <= PostLimit.MAX_LENGTH) {
      this._sendRef.current.disabled = false;
    } else {
      this._sendRef.current.disabled = true;
    }
  }

  componentDidMount() {
    this._inputRefs.map((input, i) => {
      if (i + 1 === DEFAULT_CHECKED) {
        input.checked = true;
      }
    });

    this._sendRef.current.disabled = true;
  }

  render() {
    const {currentFilm} = this.props;
    const {background, title, cover} = currentFilm;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo />
            <BreadCrumbs title = {title}/>
            <UserBlock />
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={cover} alt={title} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this._handleSubmit}>
            <div className="rating">
              <div className="rating__stars">
                <input ref={this._addRef} className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input ref={this._addRef} className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input ref={this._addRef} className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input ref={this._addRef} className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input ref={this._addRef} className="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea onChange={this._handleTextInput} ref={this._textRef} className="add-review__textarea" minLength={PostLimit.MIN_LENGTH} maxLength={PostLimit.MAX_LENGTH} name="review-text" id="review-text" placeholder="Review text"></textarea>
              <div className="add-review__submit">
                <button ref={this._sendRef} className="add-review__btn" type="submit">Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  onCommentSend: PropTypes.func.isRequired,
  currentFilm: filmProp,
};

export default AddReview;
