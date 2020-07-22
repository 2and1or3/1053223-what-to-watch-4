import * as React from "react";

import Overview from '../overview/overview';
import Details from '../details/details';
import Reviews from '../reviews/reviews';

import {FilmType, CommentType} from '../../types';
import {TabType} from '../../consts';

const ACTIVE_CLASS = `movie-nav__item--active`;
const DEFAULT_CURRENT_TAB = TabType.OVERVIEW;

interface Props {
  film: FilmType;
  comments: CommentType[];
  activeItem: string | number | React.ReactNode | {};
  onTargetClick: (subject: string) => void;
}

const Tabs: React.FunctionComponent<Props> = (props: Props) => {

  const {film, onTargetClick} = props;
  let {activeItem} = props;
  activeItem = activeItem ? activeItem : DEFAULT_CURRENT_TAB;
  const {cover, title} = film;
  let currentTab = null;

  switch (activeItem) {
    case TabType.OVERVIEW:
      currentTab = <Overview film = {film}/>;
      break;

    case TabType.DETAILS:
      currentTab = <Details film = {film}/>;
      break;

    case TabType.REVIEWS:
      currentTab = <Reviews filmId = {film.id}/>;
      break;
  }

  return (
    <div className="movie-card__wrap movie-card__translate-top">
      <div className="movie-card__info">
        <div className="movie-card__poster movie-card__poster--big">
          <img src={cover} alt={`${title} poster`} width="218" height="327" />
        </div>

        <div className="movie-card__desc">
          <nav className="movie-nav movie-card__nav">
            <ul className="movie-nav__list">
              <li className={`movie-nav__item ${activeItem === TabType.OVERVIEW ? ACTIVE_CLASS : ``}`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  onTargetClick(TabType.OVERVIEW);
                }}>Overview</a>
              </li>
              <li className={`movie-nav__item ${activeItem === TabType.DETAILS ? ACTIVE_CLASS : ``}`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  onTargetClick(TabType.DETAILS);
                }}>Details</a>
              </li>
              <li className={`movie-nav__item ${activeItem === TabType.REVIEWS ? ACTIVE_CLASS : ``}`}>
                <a href="#" className="movie-nav__link" onClick={(evt) => {
                  evt.preventDefault();
                  onTargetClick(TabType.REVIEWS);
                }}>Reviews</a>
              </li>
            </ul>
          </nav>
          {currentTab}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
