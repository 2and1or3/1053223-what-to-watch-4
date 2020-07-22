import React from "react";
import PropTypes from "prop-types";

import {AppRoute} from '../../consts.js';
import history from '../../history.js';

const Logo = (props) => {
  const {hasLight} = props;
  const logoClass = `logo__link ${hasLight ? `logo__link--light` : ``}`;

  const isMainPage = history.location.pathname === AppRoute.ROOT;
  const href = !isMainPage ? AppRoute.ROOT : ``;

  return (
    <div className="logo">
      <a href = {href} className = {logoClass}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
  );
};

Logo.propTypes = {
  hasLight: PropTypes.bool,
};

export default Logo;
