import * as React from "react";

import {FilmType} from '../../types';

const PREVIEW_DELAY = 1000;

interface Props {
  currentFilm: FilmType;
  onCardClick: (film: FilmType) => void;
  onCardHover: (subject: FilmType) => void;
  onCardLeave: () => void;
  children: React.ReactNode;
}

class Card extends React.PureComponent<Props> {
  private timerId?: ReturnType<typeof setTimeout>;

  constructor(props) {
    super(props);

    this.timerId = null;
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  render() {
    const {currentFilm, onCardClick, onCardHover, onCardLeave, children} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={() => {
          this.timerId = setTimeout(() => {
            onCardHover(currentFilm);
          }, PREVIEW_DELAY);
        }}
        onMouseLeave={() => {
          clearTimeout(this.timerId);
          onCardLeave();
        }}>
        <div
          className="small-movie-card__image"
          onClick={(evt) => {
            evt.preventDefault();
            onCardClick(currentFilm);
          }}>
          {children}
        </div>
        <h3 className="small-movie-card__title">
          <a
            className="small-movie-card__link"
            href=""
            onClick={(evt) => {
              evt.preventDefault();
              onCardClick(currentFilm);
            }}>{currentFilm.title}</a>
        </h3>
      </article>
    );
  }
}

export default Card;
