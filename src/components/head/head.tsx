import * as React from "react";

import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

const HeadClass = {
  MOVIE_CARD: `movie-card__head`,
  USER_PAGE: `user-page__head`
};

interface Props {
  hasUser?: boolean;
  hasTitle?: string;
}

const Head: React.FunctionComponent<Props> = (props: Props) => {
  const {hasUser, hasTitle} = props;

  const headClass = `page-header ${hasTitle ? HeadClass.USER_PAGE : ``} ${ hasUser ? HeadClass.MOVIE_CARD : ``}`;

  return (
    <header className={headClass}>
      <Logo />

      {hasTitle && <h1 className="page-title user-page__title">{hasTitle}</h1>}

      {hasUser && <UserBlock />}
    </header>
  );
};

export default Head;
