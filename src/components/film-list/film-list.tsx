import * as React from "react";
import {connect} from "react-redux";

import Card from '../card/card';
import GenresList from '../genres-list/genres-list';
import ShowMore from '../show-more/show-more';
import Footer from '../footer/footer';

import {FilmType, GenreType} from '../../types';
import {GenreType as DefaultGenreType, ListType} from '../../consts';
import {ActionCreator} from '../../reducer/application/application';
import withVideo from '../../hocs/with-video/with-video';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

import {getCurrentGenre, getVisibleCards, getFilteredFilms, getFavoriteFilms, getAllGenres} from '../../reducer/application/selectors';
import {getFilms} from '../../reducer/data/selectors';
import history from '../../history';
import {GetPath} from '../../utils';

const LOOK_LIKE_LIST_COUNT = 4;

const CardWithVideo = withVideo(Card);
const GenresListWithActiveItem = withActiveItem(GenresList);

interface Props {
  filmsToRender: FilmType[];
  onCardClick: (film: FilmType) => void;
  onTargetHover: (subject: FilmType) => void;
  onTargetLeave: () => void;
  onMoreClick: () => void;
  onLinkClick: (currentGenreId: string) => void;
  isNoMore: boolean;
  activeItem: string | number | React.ReactNode | {};
  listType: string;
  setDefaultFilter: () => void;
  hasGenresList?: boolean;
  hasMoreButton?: boolean;
  allGenres: GenreType[];
}

class FilmList extends React.PureComponent<Props> {

  componentDidMount() {
    const {listType, setDefaultFilter} = this.props;
    if (listType === ListType.FULL) {
      setDefaultFilter();
    }
  }

  render() {
    const {listType, onCardClick, onTargetHover, onTargetLeave, onLinkClick, onMoreClick, isNoMore, activeItem, hasMoreButton, hasGenresList, allGenres} = this.props;
    const {filmsToRender} = this.props;

    const isLookLike = listType === ListType.LOOK_LIKE;
    const isFull = listType === ListType.FULL;
    const isFavorite = listType === ListType.FAVORIE;


    return (
      <div className="page-content">
        <section className={`catalog ${isLookLike ? `` : `catalog--like-this`}`}>
          <h2 className={`catalog__title ${isFull || isFavorite ? `visually-hidden` : ``}`}>{isFull || isFavorite ? `Catalog` : `More like this`}</h2>

          {hasGenresList ? <GenresListWithActiveItem onLinkClick = {onLinkClick} genres = {allGenres}/> : ``}

          <div className="catalog__movies-list">
            {filmsToRender
          .map((film, i) => {
            return (
              <CardWithVideo
                key = {film.title + i}
                currentFilm = {film}
                onCardClick = {(clickedFilm) => {
                  history.push(GetPath.filmDetails(clickedFilm.id));
                  onCardClick(clickedFilm);
                }}
                onCardHover = {onTargetHover}
                onCardLeave = {onTargetLeave}
                isMuted = {true}
                isPlaying = {activeItem === film}
              />
            );
          })}
          </div>

          {hasMoreButton ? <ShowMore hide = {isNoMore} onMoreClick = {onMoreClick}/> : ``}
        </section>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {listType} = ownProps;

  const allGenres = getAllGenres(state);

  const currentGenre = getCurrentGenre(state);
  const visibleCards = getVisibleCards(state);
  let filmsToRender = [];
  let endOfFilms = 0;

  switch (listType) {
    case (ListType.FULL):

      if (currentGenre !== DefaultGenreType.ALL.id) {
        filmsToRender = getFilteredFilms(state);
      } else {
        filmsToRender = getFilms(state);
      }

      endOfFilms = filmsToRender.length;
      filmsToRender = filmsToRender.slice(0, visibleCards);
      break;

    case (ListType.LOOK_LIKE):
      filmsToRender = getFilteredFilms(state);
      filmsToRender = filmsToRender.slice(0, LOOK_LIKE_LIST_COUNT);
      break;

    case (ListType.FAVORIE):
      filmsToRender = getFavoriteFilms(state);
      break;
  }

  const isNoMore = filmsToRender.length >= endOfFilms;

  return {
    isNoMore,
    filmsToRender,
    allGenres,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onCardClick: (film) => {
    dispatch(ActionCreator.setCurrentFilm(film));
    dispatch(ActionCreator.setFilter(film.genre));
  },
  onLinkClick: (currentGenreId) => {
    dispatch(ActionCreator.setFilter(currentGenreId));
    dispatch(ActionCreator.resetVisibleCards());
  },
  onMoreClick: () => {
    dispatch(ActionCreator.addVisibleCards());
  },
  setDefaultFilter: () => {
    dispatch(ActionCreator.setFilter(DefaultGenreType.ALL.id));
  }
});

const ConnectedFilmList = connect(mapStateToProps, mapDispatchToProps)(FilmList);

export {FilmList};
export default ConnectedFilmList;
