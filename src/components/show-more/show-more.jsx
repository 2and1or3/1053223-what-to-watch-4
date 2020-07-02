import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {onMoreClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onMoreClick}>Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  onMoreClick: PropTypes.func.isRequired,
};

export default ShowMore;
