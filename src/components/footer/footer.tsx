import * as React from "react";

import Logo from '../logo/logo';

const Footer: React.FunctionComponent = () => {

  return (
    <footer className="page-footer">
      <Logo hasLight/>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
