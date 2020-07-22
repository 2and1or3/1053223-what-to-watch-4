import React from "react";

import {filmProp} from '../../props.js';

import Tabs from '../tabs/tabs.jsx';
import FilmList from '../film-list/film-list.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
import Header from '../header/header.jsx';
import {ListType} from '../../consts.js';


const FilmListWithActiveItem = withActiveItem(FilmList);
const TabsWithActiveItem = withActiveItem(Tabs);

const FilmDetails = (props) => {
  const {currentFilm} = props;

  return (
    <React.Fragment>
      <Header film = {currentFilm} isFull>
        <TabsWithActiveItem film = {currentFilm}/>
      </Header>
      <FilmListWithActiveItem listType = {ListType.LOOK_LIKE}/>
    </React.Fragment>
  );
};

FilmDetails.propTypes = {
  currentFilm: filmProp,
};

export default FilmDetails;
