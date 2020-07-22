import * as React from "react";

import {AppRoute} from '../../consts';
import history from '../../history';

interface Props {
  hasLight?: boolean;
}

const Logo: React.FunctionComponent<Props> = (props: Props) => {
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

export default Logo;
