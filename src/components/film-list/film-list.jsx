import React from "react";
import PropTypes from "prop-types";

import Card from '../card/card.jsx';

import {filmProp} from '../../props.js';


const FilmList = (props) => {
  const {films, isFull, onCardClick, renderPlayer, onCardHover, onCardLeave} = props;

  return (
    <div className="page-content">
      <section className={`catalog ${isFull ? `` : `catalog--like-this`}`}>
        <h2 className={`catalog__title ${isFull ? `visually-hidden` : ``}`}>{isFull ? `Catalog` : `More like this`}</h2>

        {isFull ?
          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul> : ``}

        <div className="catalog__movies-list">
          {films
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
};

export default FilmList;
