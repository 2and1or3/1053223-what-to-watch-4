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
  DOCUMENTARY: {
    id: `documentary`,
    title: `Documentary`,
  },
  DRAMA: {
    id: `drama`,
    title: `Dramas`,
  },
  HORROR: {
    id: `horror`,
    title: `Horror`,
  },
  KIDS_FAMILY: {
    id: `family`,
    title: `Kids & Family`,
  },
  ROMANCE: {
    id: `romance`,
    title: `Romance`,
  },
  SCI_FI: {
    id: `sciFi`,
    title: `Sci-Fi`,
  },
  THRILLER: {
    id: `thriller`,
    title: `Thrillers`,
  },
};

const ScreenType = {
  MAIN: `main`,
  DETAILS: `details`,
  PLAYER: `player`,
};

const STEP_VISIBLE_CARDS = 8;

export {TabType, GenreType, ScreenType, STEP_VISIBLE_CARDS};
