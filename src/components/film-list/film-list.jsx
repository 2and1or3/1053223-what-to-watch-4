import React from "react";
import PropTypes from "prop-types";

import Card from '../card/card.jsx';

import {filmProp} from '../../props.js';


const FilmList = (props) => {
  const {films, onCardClick, renderPlayer, onCardHover, onCardLeave} = props;

  return (
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
  );
};

FilmList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
  onCardLeave: PropTypes.func.isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default FilmList;
