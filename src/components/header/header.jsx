import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {filmProp} from '../../props.js';
import {ActionCreator} from '../../reducer/application/application.js';
import {Operation} from '../../reducer/data/data.js';
import {ScreenType, UserStatus, AppRoute} from '../../consts.js';
import {getUserStatus} from '../../reducer/user/selectors.js';


const AddListIcon = {
  ADD: `#add`,
  IN_LIST: `#in-list`,
};

const Header = (props) => {
  const {film, isFull, children, onPlayClick, authStatus, onSignIn, onFavoriteToggle} = props;
  const {title, background, genre, release, cover, backgroundColor, isFavorite} = film;


  const addListIcon = isFavorite ? AddListIcon.IN_LIST : AddListIcon.ADD;
  const toggleStatus = isFavorite ? 0 : 1;

  const userElement = authStatus === UserStatus.NO_AUTH ?
    (<Link className="user-block__sign-in" to = {AppRoute.LOGIN} onClick={onSignIn} style={{color: `#dfcf77`, textDecoration: `none`}}>Sign In</Link>) :
    (<div className="user-block__avatar">
      <Link to = {AppRoute.LIST}>
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </Link>
    </div>);

  const reviewLinkElement = authStatus === UserStatus.AUTH ? <a href="add-review.html" className="btn movie-card__button">Add review</a> : ``;

  const addListElement = authStatus === UserStatus.AUTH ?
    (<button className="btn btn--list movie-card__button" type="button" onClick={() => {
      onFavoriteToggle(film.id, toggleStatus);
    }}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={addListIcon}></use>
      </svg>
      <span>My list</span>
    </button>) : (
      <Link className="btn btn--list movie-card__button" to={AppRoute.LOGIN}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={addListIcon}></use>
        </svg>
        <span>My list</span>
      </Link>
    );

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
            {userElement}
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
                {addListElement}
                {isFull ? reviewLinkElement : ``}
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
  authStatus: PropTypes.string.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authStatus: getUserStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onPlayClick: () => {
    dispatch(ActionCreator.changeScreen(ScreenType.PLAYER));
  },
  onSignIn: () => {
    dispatch(ActionCreator.changeScreen(ScreenType.SIGN));
  },
  onFavoriteToggle: (filmId, satus) => {
    dispatch(Operation.togggleFavorite(filmId, satus));
  }
});


const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export {Header};
export default ConnectedHeader;
