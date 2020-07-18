import NameSpace from '../namespace.js';

const NAME_SPACE = NameSpace.DATA;

const getFilms = (state) => state[NAME_SPACE].films;

const getPromoFilm = (state) => state[NAME_SPACE].promoFilm;

const getComments = (state) => state[NAME_SPACE].commentsById;

export {getFilms, getPromoFilm, getComments};
