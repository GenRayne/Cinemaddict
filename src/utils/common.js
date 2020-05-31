import moment from "moment";
import {
  START_INDEX, INPUT_ERROR_SHADOW, SHAKE_TIMEOUT, MINUTES_IN_HOUR, UserRating, RatingStep
} from '../const';
import {getWatchedMovies} from './filter';

export const getTopRated = (films, count) => films.slice()
  .sort((a, b) => b.rating - a.rating)
  .slice(START_INDEX, count)
  .filter((item) => item.rating);

export const getTopCommented = (films, count) => films.slice()
  .sort((a, b) => b.comments.length - a.comments.length)
  .slice(START_INDEX, count)
  .filter((item) => item.commentIds.length);

// ==================== Разное ====================

export const isChecked = (isTrue) => isTrue ? `checked` : ``;

export const shake = (element) => {
  element.classList.add(`shake`);

  setTimeout(() => {
    element.classList.remove(`shake`);
  }, SHAKE_TIMEOUT);
};

export const getUserRating = (movies) => {
  const moviesWatched = getWatchedMovies(movies).length;

  let userRating = ``;

  if (moviesWatched && moviesWatched <= RatingStep.FIRST) {
    userRating = UserRating.NOVICE;

  } else if (moviesWatched > RatingStep.FIRST
          && moviesWatched <= RatingStep.SECOND) {
    userRating = UserRating.FAN;

  } else if (moviesWatched > RatingStep.SECOND) {
    userRating = UserRating.MOVIE_BUFF;
  }

  return userRating;
};

// ================= Стили ошибки =================

export const stylizeInputError = (element) => {
  element.style.boxShadow = INPUT_ERROR_SHADOW;
};

export const stylizeBackToNormal = (element) => {
  element.style = ``;
};

// ================= Время / дата =================

export const formatTime = (date) => moment(date).format(`HH:mm`);

export const formatDate = (date) => moment(date).format(`YYYY/MM/DD`);

export const formatLongDate = (date) => moment(date).format(`D MMMM YYYY`);

export const getDateFromNow = (date) => moment(date).fromNow();

export const getHours = (minutes) => moment.duration(minutes, `minutes`).hours();

export const getMinutesLeft = (minutes) => minutes % MINUTES_IN_HOUR;

export const getDuration = (minutes) => {
  const hours = getHours(minutes);
  const minutesLeft = getMinutesLeft(minutes);
  return hours ? `${hours}h ${minutesLeft}m` : `${minutes}m`;
};

export const filterByWatchingDates = (movies, date) => {
  return movies.filter((movie) =>{
    return moment(movie.watchingDate) > date;
  });
};

// ============== Случайные значения ==============

export const getRandomInteger = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomInteger(array.length);
  return array[randomIndex];
};

export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomArrayFromArray = (array, max, min) => {
  const randomArray = [];
  while (randomArray.length <= getRandomInteger(max, min)) {
    const newItem = getRandomArrayItem(array);
    if (randomArray.indexOf(newItem) === -1) {
      randomArray.push(newItem);
    }
  }
  return randomArray;
};
