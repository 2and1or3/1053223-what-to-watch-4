import * as React from "react";
import {connect} from "react-redux";

import Head from '../head/head';

import {FilmType} from '../../types';
import {Operation} from '../../reducer/data/data';
import {UserStatus, AppRoute} from '../../consts';
import {getUserStatus} from '../../reducer/user/selectors';
import history from '../../history';
import {GetPath} from '../../utils';


const AddListIcon = {
  ADD: `#add`,
  IN_LIST: `#in-list`,
};

interface Props {
  film: FilmType;
  isFull?: boolean;
  children: React.ReactNode;
  authStatus: string;
  onFavoriteToggle: (filmId: string | number, status: number) => void;
  hasCommonPoster?: boolean;
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
  const {film, isFull, children, authStatus, onFavoriteToggle, hasCommonPoster} = props;
  const {title, background, genre, release, cover, backgroundColor, isFavorite} = film;

  const addListIcon = isFavorite ? AddListIcon.IN_LIST : AddListIcon.ADD;
  const toggleStatus = isFavorite ? 0 : 1;
  const isAuth = authStatus === UserStatus.AUTH;


  const reviewLinkElement = (
    <a href="add-review.html" className="btn movie-card__button"
      onClick={(evt) => {
        evt.preventDefault();
        if (isAuth) {
          history.push(GetPath.filmReview(film.id));
        } else {
          history.push(AppRoute.LOGIN);
        }
      }}>Add review</a>);

  const addListElement = (
    <button className="btn btn--list movie-card__button" type="button" onClick={() => {
      if (isAuth) {
        onFavoriteToggle(film.id, toggleStatus);
      } else {
        history.push(AppRoute.LOGIN);
      }
    }}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={addListIcon}></use>
      </svg>
      <span>My list</span>
    </button>
  );


  return (
    <section className={`movie-card ${isFull ? `movie-card--full` : ``}`}>
      <div className={isFull ? `movie-card__hero` : ``}>

        <div className="movie-card__bg" style={{backgroundColor}}>
          <img src={background} alt={title}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Head hasUser/>

        <div className="movie-card__wrap">
          <div className={isFull ? `` : `movie-card__info`}>
            {hasCommonPoster ?
              <div className="movie-card__poster">
                <img src={cover} alt={`${title} poster`} width="218" height="327" />
              </div> : ``
            }

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{release}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={(evt) => {
                  evt.preventDefault();
                  history.push(GetPath.filmPlayer(film.id));
                }}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {addListElement}
                {isFull ? reviewLinkElement : ``}
              </div>
            </div>
          </div>
        </div>
      </div>

      {children ? children : ``}
    </section>
  );
};

const mapStateToProps = (state) => ({
  authStatus: getUserStatus(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onFavoriteToggle: (filmId, satus) => {
    dispatch(Operation.togggleFavorite(filmId, satus));
    if (!ownProps.isFull) {
      dispatch(Operation.getPromoFilm());
    }
  }
});

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export {Header};
export default ConnectedHeader;
