import React from "react";
import PropTypes from "prop-types";

import Logo from '../logo/logo.jsx';
import UserBlock from '../user-block/user-block.jsx';

const HeadClass = {
  MOVIE_CARD: `movie-card__head`,
  USER_PAGE: `user-page__head`
};

const Head = (props) => {
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

Head.propTypes = {
  hasUser: PropTypes.bool,
  hasTitle: PropTypes.bool,
};


export default Head;
