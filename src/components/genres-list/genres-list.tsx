import * as React from "react";

import {GenreType as DefaultGenres} from '../../consts';
import {GenreType} from '../../types';

const ACTIVE_CLASS = `catalog__genres-item--active`;
const MAX_GENRES_QUANTITY = 10;
const DEFAULT_ACTIVE_GENRE = DefaultGenres.ALL.id;

interface Props {
  onLinkClick: (currentGenreId: string) => void;
  activeItem: string | number | React.ReactNode | {};
  onTargetClick: (subject: string) => void;
  genres: GenreType[];
}

const GenresList: React.FunctionComponent<Props> = (props: Props) => {
  const {onLinkClick, onTargetClick, genres} = props;

  let {activeItem} = props;
  activeItem = activeItem ? activeItem : DEFAULT_ACTIVE_GENRE;

  return (
    <ul className="catalog__genres-list">
      {genres
        .slice(0, MAX_GENRES_QUANTITY)
        .map((genre) => (
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


export default GenresList;
