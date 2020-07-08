import React from "react";

import FilmList from '../film-list/film-list.jsx';
import Header from '../header/header.jsx';
import {filmProp} from '../../props.js';

import withActiveItem from '../../hocs/with-active-item/with-active-item.js';


const FilmListWithActiveItem = withActiveItem(FilmList);

const Main = (props) => {
  const {promoFilm} = props;

  return <React.Fragment>
    <Header film = {promoFilm} isFull = {false}/>
    <FilmListWithActiveItem isFull = {true}/>
  </React.Fragment>;
};

Main.propTypes = {
  promoFilm: filmProp,
};

export default Main;
