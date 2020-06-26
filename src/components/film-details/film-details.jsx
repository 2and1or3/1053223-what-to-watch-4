import React from "react";
import PropTypes from "prop-types";

import {filmProp} from '../../props.js';

import Tabs from '../tabs/tabs.jsx';
import FilmList from '../film-list/film-list.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.js';

import {comments} from '../../mocks/comments.js';

const LOOK_LIKE_LIST_COUNT = 4;


const FilmListWithVideoPlayer = withVideoPlayer(FilmList);

const FilmDetails = (props) => {
  const {currentFilm, films, onCardClick} = props;
  const {title, background, genre, release} = currentFilm;

  const lookLikeFilms = films.filter((film) => currentFilm.genre === film.genre).slice(0, LOOK_LIKE_LIST_COUNT);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={background} alt={title} />
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
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{release}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
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
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        {<Tabs film = {currentFilm} comments = {comments}/>}

      </section>
      <FilmListWithVideoPlayer films = {lookLikeFilms} isFull = {false} onCardClick = {onCardClick}/>
    </React.Fragment>
  );
};

FilmDetails.propTypes = {
  currentFilm: filmProp,
  films: PropTypes.arrayOf(filmProp),
  onCardClick: PropTypes.func.isRequired,
};

export default FilmDetails;
