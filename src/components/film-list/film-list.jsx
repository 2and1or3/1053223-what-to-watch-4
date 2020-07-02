import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Card from '../card/card.jsx';
import GenresList from '../genres-list/genres-list.jsx';

import {filmProp} from '../../props.js';
import {ScreenType, GenreType} from '../../consts.js';
import {ActionCreator} from '../../reducer.js';

const LOOK_LIKE_LIST_COUNT = 4;


const FilmList = (props) => {
  const {films, isFull, onCardClick, renderPlayer, onCardHover, onCardLeave, currentFilm, currentGenre, onLinkClick} = props;

  let filmsToRender = films;
  let filterByGenre = currentFilm ? currentFilm.genre : currentGenre;

  if (filterByGenre !== GenreType.ALL.id) {
    filmsToRender = films.filter((film) => filterByGenre === film.genre);
  }

  if (!isFull) {
    filmsToRender = filmsToRender.slice(0, LOOK_LIKE_LIST_COUNT);
  }

  return (
    <div className="page-content">
      <section className={`catalog ${isFull ? `` : `catalog--like-this`}`}>
        <h2 className={`catalog__title ${isFull ? `visually-hidden` : ``}`}>{isFull ? `Catalog` : `More like this`}</h2>

        {isFull ? <GenresList currentGenre = {currentGenre} onLinkClick = {onLinkClick}/> : ``}

        <div className="catalog__movies-list">
          {filmsToRender
          .map((film, i) => {

            return (
              <Card
                key = {film.title + i}
                film = {film}
                onCardClick = {onCardClick}
                renderPlayer = {renderPlayer}
                onCardHover = {onCardHover}
                onCardLeave = {onCardLeave}
              />
            );
          })}
        </div>

        {isFull ?
          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div> : ``}
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardLeave: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  isFull: PropTypes.bool.isRequired,
  currentFilm: PropTypes.shape(filmProp).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  currentFilm: state.currentFilm,
  currentGenre: state.currentGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onCardClick: (film) => {
    dispatch(ActionCreator.changeScreen(ScreenType.DETAILS));
    dispatch(ActionCreator.setCurrentFilm(film));
  },
  onLinkClick: (currentGenreId) => {
    dispatch(ActionCreator.setFilter(currentGenreId));
  }
});

const ConnectedFilmList = connect(mapStateToProps, mapDispatchToProps)(FilmList);

export {FilmList};
export default ConnectedFilmList;
