import React from "react";
import PropTypes from "prop-types";

import Main from '../main/main.jsx';

const App = (props) => {
  const {promoTitle, promoGenres, promoRelease, films} = props;

  return (
    <Main
      title = {promoTitle}
      genres = {promoGenres}
      release = {promoRelease}
      films = {films}
    />
  );
};

App.propTypes = {
  promoTitle: PropTypes.string.isRequired,
  promoGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
  promoRelease: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
      })).isRequired,
};

export default App;
