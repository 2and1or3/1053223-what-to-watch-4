const TabType = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};

const UserStatus = {
  NO_AUTH: `NO_AUTH`,
  AUTH: `AUTH`,
};

const AppRoute = {
  ROOT: `${process.env.PUBLIC_URL || ``}/`,
  LOGIN: `/login`,
  LIST: `/mylist`,
  FILM: `/films/`,
  PLAYER: `/player`,
  REVIEW: `/review`,
  FILM_BY_ID: `/films/:id`,
  PLAYER_BY_ID: `/films/:id/player`,
  REVIEW_BY_ID: `/films/:id/review`,
};

const GenreType = {
  ALL: {
    id: `all`,
    title: `All genres`,
  },
};

const STEP_VISIBLE_CARDS = 8;

const URL = {
  BASE: `https://4.react.pages.academy/wtw`,
  LOAD: `/films`,
  PROMO: `/films/promo`,
  LOGIN: `/login`,
  COMMENT: `/comments/`,
  FAVORITE: `/favorite/`,
};

const DEFAULT_FILM = {
  id: `default`,
  title: `default`,
  poster: `default`,
  preview: `default`,
  src: `default`,
  isFavorite: false,
  background: `default`,
  backgroundColor: `default`,
  cover: `default`,
  genre: `default`,
  release: `default`,
  description: `default`,
  rating: 8.9,
  voiceCount: 240,
  duration: 33,
  director: `default`,
  actors: [`default`],
};

const ListType = {
  FAVORIE: `FAVORIE`,
  LOOK_LIKE: `LOOK_LIKE`,
  FULL: `FULL`,
};

const MONTHS = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export {TabType, GenreType, STEP_VISIBLE_CARDS, URL, UserStatus, AppRoute, DEFAULT_FILM, ListType, MONTHS};
