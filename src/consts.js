const TabType = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
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

const ScreenType = {
  MAIN: `main`,
  DETAILS: `details`,
  PLAYER: `player`,
};

const STEP_VISIBLE_CARDS = 8;

const URL = {
  BASE: `https://4.react.pages.academy/wtw`,
  LOAD: `/films`,
  PROMO: `/films/promo`,
};

export {TabType, GenreType, ScreenType, STEP_VISIBLE_CARDS, URL};
