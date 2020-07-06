import React from "react";
import PropTypes from "prop-types";

import {GenreType} from '../../consts.js';

const ACTIVE_CLASS = `catalog__genres-item--active`;
const MAX_GENRES_QUANTITY = 10;
const DEFAULT_ACTIVE_GENRE = GenreType.ALL.id;

const GenresList = (props) => {
  const {onLinkClick, onTargetClick} = props;
  let {activeItem} = props;
  activeItem = activeItem ? activeItem : DEFAULT_ACTIVE_GENRE;

  return (
    <ul className="catalog__genres-list">
      {Object.entries(GenreType)
        .slice(0, MAX_GENRES_QUANTITY)
        .map(([, genre]) => (
          <li className={`catalog__genres-item ${activeItem === genre.id ? ACTIVE_CLASS : ``}`} id={genre.id} key={genre.id}>
            <a href="#" className="catalog__genres-link"
              onClick={() => {
                onLinkClick(genre.id);
                onTargetClick(genre.id);
              }
              }>{genre.title}</a>
          </li>
        ))}
    </ul>
  );
};

GenresList.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  activeItem: PropTypes.any.isRequired,
  onTargetClick: PropTypes.func.isRequired,
};

export default GenresList;
