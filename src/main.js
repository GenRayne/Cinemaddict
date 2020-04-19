import UserSection from './components/user-section';
import MainMenu from './components/main-menu';
import Sort from './components/sort';
import FilmsSection from './components/films-section';
import FilmsList from './components/films-list';
import FilmsContainer from './components/films-container';
import FilmCard from './components/film-card';
import MoreBtn from './components/more-btn';
import FilmsExtra from './components/films-extra';
import FooterStats from './components/footer-stats';
import FilmDetails from './components/film-details';

import {RenderPosition, ExtraTitle, Key} from './const';
import {render} from './utils';
import {generateFilms} from './mock/film';

const START_INDEX = 0;

const FILMS_NUMBER = 27;
const EXTRA_FILMS_NUMBER = 2;

const SHOWN_FILMS_NUMBER_AT_START = 5;
const SHOWN_FILMS_NUMBER_BY_BTN = 5;

const films = generateFilms(FILMS_NUMBER);

let shownFilmsNumber = SHOWN_FILMS_NUMBER_AT_START;

const topRated = films.slice().sort((a, b) => {
  return b.rating - a.rating;
}).slice(START_INDEX, EXTRA_FILMS_NUMBER);

const topCommented = films.slice().sort((a, b) => {
  return b.comments.length - a.comments.length;
})
.slice(START_INDEX, EXTRA_FILMS_NUMBER);

// =======================================================

const userSectionElement = new UserSection(films).getElement();
const mainMenuElement = new MainMenu(films).getElement();
const sortElement = new Sort().getElement();

const filmsContainerElement = new FilmsContainer().getElement();
const filmsListElement = new FilmsList(filmsContainerElement).getElement();
const filmsSectionElement = new FilmsSection(filmsListElement).getElement();

const filmsTopRatedElement = new FilmsExtra(ExtraTitle.TOP_RATED, topRated).getElement();
const filmsTopCommentedElement = new FilmsExtra(ExtraTitle.TOP_COMMENTED, topCommented).getElement();

const filmsTopRatedContainer = new FilmsContainer().getElement();
const filmsTopCommentedContainer = new FilmsContainer().getElement();

const moreBtnElement = new MoreBtn().getElement();

// =======================================================

const renderFilm = (filmsListContainer, film) => {
  const onPopupOpen = (evt) => {
    evt.preventDefault();
    bodyElement.append(filmDetailsElement);
    document.addEventListener(`keydown`, onEscapePress);
  };

  const onCloseBtnClick = (evt) => {
    evt.preventDefault();
    filmDetailsElement.remove();
  };

  const onEscapePress = (evt) => {
    evt.preventDefault();
    if (evt.key === Key.ESCAPE) {
      filmDetailsElement.remove();
      document.removeEventListener(`keydown`, onEscapePress);
    }
  };

  const filmCardElement = new FilmCard(film).getElement();
  const filmDetailsElement = new FilmDetails(film).getElement();

  const poster = filmCardElement.querySelector(`.film-card__poster`);
  const title = filmCardElement.querySelector(`.film-card__title`);
  const commentsNumber = filmCardElement.querySelector(`.film-card__comments`);
  const closeBtn = filmDetailsElement.querySelector(`.film-details__close-btn`);

  poster.addEventListener(`click`, onPopupOpen);
  title.addEventListener(`click`, onPopupOpen);
  commentsNumber.addEventListener(`click`, onPopupOpen);
  closeBtn.addEventListener(`click`, onCloseBtnClick);

  render(filmsListContainer, filmCardElement, RenderPosition.BEFOREEND);
};

const renderFilms = (filmsContainer, filmsList, fromIndex, toIndex) => {
  filmsList.slice(fromIndex, toIndex).forEach((film) => {
    renderFilm(filmsContainer, film);
  });
};

const renderPage = () => {
  render(siteHeaderElement, userSectionElement, RenderPosition.BEFOREEND);
  render(siteMainElement, mainMenuElement, RenderPosition.BEFOREEND);
  render(siteMainElement, sortElement, RenderPosition.BEFOREEND);
  render(siteMainElement, filmsSectionElement, RenderPosition.BEFOREEND);

  renderFilms(filmsContainerElement, films, START_INDEX, SHOWN_FILMS_NUMBER_AT_START);

  render(filmsListElement, filmsContainerElement, RenderPosition.BEFOREEND);
  render(filmsSectionElement, filmsListElement, RenderPosition.BEFOREEND);

  renderFilms(filmsTopRatedContainer, topRated, START_INDEX);
  renderFilms(filmsTopCommentedContainer, topCommented, START_INDEX);

  render(filmsTopRatedElement, filmsTopRatedContainer, RenderPosition.BEFOREEND);
  render(filmsTopCommentedElement, filmsTopCommentedContainer, RenderPosition.BEFOREEND);
  render(filmsSectionElement, filmsTopRatedElement, RenderPosition.BEFOREEND);
  render(filmsSectionElement, filmsTopCommentedElement, RenderPosition.BEFOREEND);

  render(filmsListElement, moreBtnElement, RenderPosition.BEFOREEND);
};

// =======================================================

const bodyElement = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

renderPage();

render(siteFooterElement, new FooterStats(FILMS_NUMBER).getElement(), `beforeend`);

// =======================================================

moreBtnElement.addEventListener(`click`, () => {
  const prevShownFilmsNumber = shownFilmsNumber;
  shownFilmsNumber += SHOWN_FILMS_NUMBER_BY_BTN;

  renderFilms(filmsContainerElement, films, prevShownFilmsNumber, shownFilmsNumber);

  if (shownFilmsNumber >= films.length) {
    moreBtnElement.remove();
  }
});
