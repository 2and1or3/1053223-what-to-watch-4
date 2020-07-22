import * as React from "react";

import FilmList from '../film-list/film-list';
import Head from '../head/head';

import {ListType} from '../../consts';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
const FilmListWithActiveItem = withActiveItem(FilmList);

const MY_LIST_TITLE = `My list`;

const MyList: React.FunctionComponent = () => {

  return (
    <div className="user-page">
      <Head hasUser hasTitle = {MY_LIST_TITLE}/>
      <FilmListWithActiveItem listType = {ListType.FAVORIE}/>
    </div>
  );
};

export default MyList;
