import {AppRoute} from './consts.js';

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
  filmReview: (id) => `${AppRoute.FILM}:${id}${AppRoute.REVIEW}`,
  filmPlayer: (id) => `${AppRoute.FILM}:${id}${AppRoute.PLAYER}`,
  filmDetails: (id) => `${AppRoute.FILM}:${id}`,
};

export {createVideoMock, adapterToLocalFilms, extend, adapterToLocalComments, GetPath};
