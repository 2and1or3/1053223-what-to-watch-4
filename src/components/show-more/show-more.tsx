import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {onMoreClick, hide} = props;

  const element = (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onMoreClick}>Show more</button>
    </div>
  );

  return hide ? hide : element;
};

ShowMore.propTypes = {
  onMoreClick: PropTypes.func.isRequired,
};

export default ShowMore;
