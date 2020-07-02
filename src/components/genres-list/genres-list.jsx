import React from "react";
import PropTypes from "prop-types";

import {GenreType} from '../../consts.js';

const ACTIVE_CLASS = `catalog__genres-item--active`;
const MAX_GENRES_QUANTITY = 10;

const GenresList = (props) => {
  const {currentGenre, onLinkClick} = props;

  return (
    <ul className="catalog__genres-list">
      {Object.entries(GenreType)
        .slice(0, MAX_GENRES_QUANTITY)
        .map(([, genre]) => (
          <li className={`catalog__genres-item ${currentGenre === genre.id ? ACTIVE_CLASS : ``}`} id={genre.id} key={genre.id}>
            <a href="#" className="catalog__genres-link"
              onClick={() => {
                onLinkClick(genre.id);
              }
              }>{genre.title}</a>
          </li>
        ))}
    </ul>
  );
};

GenresList.propTypes = {
  currentGenre: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func.isRequired,
};

export default GenresList;
