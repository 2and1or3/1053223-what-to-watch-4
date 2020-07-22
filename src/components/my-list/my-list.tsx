import React from "react";

import FilmList from '../film-list/film-list.jsx';
import Head from '../head/head.jsx';

import {ListType} from '../../consts.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.js';
const FilmListWithActiveItem = withActiveItem(FilmList);

const MY_LIST_TITLE = `My list`;

const MyList = () => {

  return (
    <div className="user-page">
      <Head hasUser hasTitle = {MY_LIST_TITLE}/>
      <FilmListWithActiveItem listType = {ListType.FAVORIE}/>
    </div>
  );
};

export default MyList;
