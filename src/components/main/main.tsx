import * as React from "react";

import FilmList from '../film-list/film-list';
import Header from '../header/header';
import {FilmType} from '../../types';

import withActiveItem from '../../hocs/with-active-item/with-active-item';
import {ListType} from '../../consts';


const FilmListWithActiveItem = withActiveItem(FilmList);

interface Props {
  promoFilm: FilmType;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {promoFilm} = props;

  return <React.Fragment>
    <Header film = {promoFilm} hasCommonPoster/>
    <FilmListWithActiveItem hasMoreButton hasGenresList listType = {ListType.FULL}/>
  </React.Fragment>;
};

export default Main;
