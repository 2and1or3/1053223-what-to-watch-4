import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {PureComponent} from "react";

import Card from '../card/card.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMore from '../show-more/show-more.jsx';
import Footer from '../footer/footer.jsx';

import {filmProp} from '../../props.js';
import {GenreType, ListType} from '../../consts.js';
import {ActionCreator} from '../../reducer/application/application.js';
import withVideo from '../../hocs/with-video/with-video.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';

import {getCurrentGenre, getVisibleCards, getFilteredFilms, getFavoriteFilms, getAllGenres} from '../../reducer/application/selectors.js';
import {getFilms} from '../../reducer/data/selectors.js';
import history from '../../history.js';
import {GetPath} from '../../utils.js';

const LOOK_LIKE_LIST_COUNT = 4;

const CardWithVideo = withVideo(Card);
const GenresListWithActiveItem = withActiveItem(GenresList);

class FilmList extends PureComponent {

  componentDidMount() {
    const {listType, setDefaultFilter} = this.props;
    if (listType === ListType.FULL) {
      setDefaultFilter();
    }
  }

  render() {
    const {listType, onCardClick, onTargetHover, onTargetLeave, onLinkClick, onMoreClick, isNoMore, activeItem, hasMoreButton, hasGenresList, allGenres} = this.props;
    let {filmsToRender} = this.props;

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

FilmList.propTypes = {
  filmsToRender: PropTypes.arrayOf(filmProp).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onTargetHover: PropTypes.func.isRequired,
  onTargetLeave: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  isNoMore: PropTypes.bool.isRequired,
  activeItem: PropTypes.any.isRequired,
  listType: PropTypes.string.isRequired,
  setDefaultFilter: PropTypes.func.isRequired,
  hasGenresList: PropTypes.bool,
  hasMoreButton: PropTypes.bool,
  allGenres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
};

const mapStateToProps = (state, ownProps) => {
  const {listType} = ownProps;

  const allGenres = getAllGenres(state);

  const currentGenre = getCurrentGenre(state);
  const visibleCards = getVisibleCards(state);
  let filmsToRender = [];
  let endOfFilms = 0;

  switch (listType) {
    case (ListType.FULL):

      if (currentGenre !== GenreType.ALL.id) {
        filmsToRender = getFilteredFilms(state);
      } else {
        filmsToRender = getFilms(state);
      }

      endOfFilms = filmsToRender.length;
      filmsToRender = filmsToRender.slice(0, visibleCards);
      break;

    case (ListType.LOOK_LIKE):
      filmsToRender = getFilteredFilms(state);
      // remove copy
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
    dispatch(ActionCreator.setFilter(GenreType.ALL.id));
  }
});

const ConnectedFilmList = connect(mapStateToProps, mapDispatchToProps)(FilmList);

export {FilmList};
export default ConnectedFilmList;
