import PropTypes from "prop-types";

const filmProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  release: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  voiceCount: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  actors: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired;

const commentProp = PropTypes.shape({
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
}).isRequired;

const refProp = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.shape({current: PropTypes.instanceOf(Element)})
]).isRequired;

export {filmProp, commentProp, refProp};
