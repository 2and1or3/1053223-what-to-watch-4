import React from "react";
import PropTypes from "prop-types";
import {PureComponent} from "react";

import Card from '../card/card.jsx';


class FilmList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hoveredCard: null,
    };
  }

  render() {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films
          .map((film, i) => {

            return <Card
              key = {film.title + i}
              film = {film}
              onTitleClick = {() => {}}
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
  films: PropTypes.array.isRequired,
};

export default FilmList;
