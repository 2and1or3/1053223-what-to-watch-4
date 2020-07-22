import * as React from "react";

import {FilmType} from '../../types';

import Tabs from '../tabs/tabs';
import FilmList from '../film-list/film-list';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import Header from '../header/header';
import {ListType} from '../../consts';


const FilmListWithActiveItem = withActiveItem(FilmList);
const TabsWithActiveItem = withActiveItem(Tabs);

interface Props {
  currentFilm: FilmType;
}

const FilmDetails: React.FunctionComponent<Props> = (props: Props) => {
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

export default FilmDetails;
