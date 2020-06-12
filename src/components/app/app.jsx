import React from "react";

import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {promoTitle, promoGenres, promoRelease} = props;

  return <React.Fragment>
    <Main title = {promoTitle} genres = {promoGenres} release = {promoRelease}/>
  </React.Fragment>;
};

export default App;
