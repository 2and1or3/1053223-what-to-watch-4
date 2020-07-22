import React from "react";

import Logo from '../logo/logo.jsx';

const Footer = () => {

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
