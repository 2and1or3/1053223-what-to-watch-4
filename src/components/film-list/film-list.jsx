import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

import Card from '../card/card.jsx';
import withVideoPlayer from '../../hocs/with-video-player/with-video-player.js';

import {filmProp} from '../../props.js';


const CardWithVideoPlayer = withVideoPlayer(Card);

class FilmList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hoveredCard: null,
    };
  }

  render() {
    const {films, onCardClick} = this.props;

    return (
      <div className="catalog__movies-list">
        {films
          .map((film, i) => {

            return <CardWithVideoPlayer
              key = {film.title + i}
              film = {film}
              onCardClick = {onCardClick}
              onHover = {(hoveredFilm) => {
                this.setState({
                  hoveredCard: hoveredFilm,
                });
              }}/>;
          })}
      </div>
    );
  }
}

FilmList.propTypes = {
  films: PropTypes.arrayOf(filmProp).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

export default FilmList;
