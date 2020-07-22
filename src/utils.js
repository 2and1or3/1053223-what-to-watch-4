import {AppRoute, MONTHS} from './consts';

const createVideoMock = (element) => {
  if (element.type === `video`) {
    return element;
  }

  return null;
};


const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const adapterToLocalFilms = (films) => {

  const localFilms =
    films
    .slice()
    .map((film) => ({
      id: film.id.toString(),
      isFavorite: film.is_favorite,
      title: film.name,
      poster: film.preview_image,
      preview: film.preview_video_link,
      src: film.video_link,
      background: film.background_image,
      backgroundColor: film.background_color,
      cover: film.poster_image,
      genre: film.genre.toLowerCase(),
      release: film.released.toString(),
      description: film.description,
      rating: film.rating,
      voiceCount: film.scores_count,
      duration: film.run_time,
      director: film.director,
      actors: film.starring.slice(),
    }));

  return localFilms;
};

const adapterToLocalComments = (comments) => {

  const localComments =
  comments
  .map((comment) => ({
    id: comment.id.toString(),
    author: comment.user.name,
    date: comment.date,
    description: comment.comment,
    rate: comment.rating.toString(),
  }));

  return localComments;
};

const GetPath = {
  filmReview: (id) => `${AppRoute.FILM}${id}${AppRoute.REVIEW}`,
  filmPlayer: (id) => `${AppRoute.FILM}${id}${AppRoute.PLAYER}`,
  filmDetails: (id) => `${AppRoute.FILM}${id}`,
};

const getDateFormat = (date) => {
  const data = new Date(date);
  const month = data.getMonth();
  const day = data.getDate();
  const year = data.getFullYear();

  return `${MONTHS[month]} ${day} ${year}`;
};

const getWatchTimeFormat = (seconds) => {

  let hours = Math.floor(seconds / 3600);
  let min = Math.floor((seconds - hours * 3600) / 60);
  let sec = seconds - hours * 3600 - min * 60;

  hours = hours.toString();
  min = min.toString().padStart(2, `0`);
  sec = sec.toString().padStart(2, `0`);

  return `${hours}:${min}:${sec}`;
};

const capitalize = (str) => {
  str = str.toLowerCase();
  let words = str.split(` `);

  words = words.map((word) => word[0].toUpperCase() + word.slice(1));
  str = words.join(` `);

  return str;
};

const getUniqueGenres = (genres) => {
  let uniqueGenres = [];

  genres.forEach((genre) => {
    const isRepeated = uniqueGenres.some((uniqueGenre) => uniqueGenre === genre);

    if (!isRepeated) {
      uniqueGenres.push(genre);
    }
  });


  const localUniqueGenres = uniqueGenres.map((uniqueGenre) => ({
    id: uniqueGenre,
    title: capitalize(uniqueGenre),
  }));

  return localUniqueGenres;
};

const noop = () => {};

export {createVideoMock, adapterToLocalFilms, extend, adapterToLocalComments, GetPath, getDateFormat, getWatchTimeFormat, getUniqueGenres, noop};
