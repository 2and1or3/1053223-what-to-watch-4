import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import {filmProp} from '../../props.js';
import {ActionCreator} from '../../reducer/application/application.js';
import {ScreenType} from '../../consts.js';

const Header = (props) => {
  const {film, isFull, children, onPlayClick} = props;
  const {title, background, genre, release, cover, backgroundColor} = film;

  return (
    <section className={`movie-card ${isFull ? `movie-card--full` : ``}`}>
      <div className={isFull ? `movie-card__hero` : ``}>

        <div className="movie-card__bg" style={{backgroundColor}}>
          <img src={background} alt={title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className={isFull ? `` : `movie-card__info`}>
            {isFull ? `` :
              <div className="movie-card__poster">
                <img src={cover} alt={`${title} poster`} width="218" height="327" />
              </div>
            }

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{release}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={onPlayClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                {isFull ? <a href="add-review.html" className="btn movie-card__button">Add review</a> : ``}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFull ? children : ``}

    </section>
  );
};

Header.propTypes = {
  film: filmProp,
  isFull: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onPlayClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onPlayClick: () => {
    dispatch(ActionCreator.changeScreen(ScreenType.PLAYER));
  },
});


const ConnectedHeader = connect(null, mapDispatchToProps)(Header);

export {Header};
export default ConnectedHeader;
