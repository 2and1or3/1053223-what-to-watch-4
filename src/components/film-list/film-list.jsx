import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Card from '../card/card.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMore from '../show-more/show-more.jsx';

import {filmProp} from '../../props.js';
import {ScreenType, GenreType} from '../../consts.js';
import {ActionCreator} from '../../reducer.js';

const LOOK_LIKE_LIST_COUNT = 4;

const getFilteredFilms = (films, filter) => films.filter((film) => filter === film.genre);


const FilmList = (props) => {
  const {isFull, onCardClick, renderPlayer, onCardHover, onCardLeave, currentGenre, onLinkClick, onMoreClick, endOfFilteredFilms} = props;
  let {filmsToRender} = props;

  const isEndOfFilms = filmsToRender.length >= endOfFilteredFilms;

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

        {isFull && !isEndOfFilms ? <ShowMore onMoreClick = {onMoreClick}/> : ``}
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
  filmsToRender: PropTypes.arrayOf(filmProp).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardLeave: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
  isFull: PropTypes.bool.isRequired,
  currentGenre: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  endOfFilteredFilms: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  const {films, currentFilm, currentGenre, visibleCards} = state;
  let filmsToRender = films;
  const filterByGenre = currentFilm ? currentFilm.genre : currentGenre;

  if (filterByGenre !== GenreType.ALL.id) {
    filmsToRender = getFilteredFilms(filmsToRender, filterByGenre);
  }

  const endOfFilteredFilms = filmsToRender.length;
  filmsToRender = filmsToRender.slice(0, visibleCards);

  return {
    films,
    endOfFilteredFilms,
    filmsToRender,
    currentGenre,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCardClick: (film) => {
    dispatch(ActionCreator.changeScreen(ScreenType.DETAILS));
    dispatch(ActionCreator.setCurrentFilm(film));
  },
  onLinkClick: (currentGenreId) => {
    dispatch(ActionCreator.setFilter(currentGenreId));
    dispatch(ActionCreator.resetVisibleCards());
  },
  onMoreClick: () => {
    dispatch(ActionCreator.addVisibleCards());
  }
});

const ConnectedFilmList = connect(mapStateToProps, mapDispatchToProps)(FilmList);

export {FilmList};
export default ConnectedFilmList;
