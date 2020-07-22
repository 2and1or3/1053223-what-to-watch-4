import React from "react";
import PropTypes from "prop-types";

const BreadCrumbs = (props) => {
  const {title} = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a href="movie-page.html" className="breadcrumbs__link">{title}</a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
};

BreadCrumbs.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BreadCrumbs;
