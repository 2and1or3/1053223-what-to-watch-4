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
  ROOT: `/`,
  LOGIN: `/login`,
  LIST: `/mylist`,
  FILM: `/films/`,
  PLAYER: `/player`,
  REVIEW: `/review`,
};

const GenreType = {
  ALL: {
    id: `all`,
    title: `All genres`,
  },
  COMEDY: {
    id: `comedy`,
    title: `Comedies`,
  },
  CRIME: {
    id: `crime`,
    title: `Crime`,
  },
  DRAMA: {
    id: `drama`,
    title: `Dramas`,
  },
  THRILLER: {
    id: `thriller`,
    title: `Thrillers`,
  },
  ADVENTURE: {
    id: `adventure`,
    title: `Adventure`,
  },
  ACTION: {
    id: `action`,
    title: `Action`,
  },
  FANTASY: {
    id: `fantasy`,
    title: `Fantasy`,
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

export {TabType, GenreType, STEP_VISIBLE_CARDS, URL, UserStatus, AppRoute, DEFAULT_FILM, ListType};
