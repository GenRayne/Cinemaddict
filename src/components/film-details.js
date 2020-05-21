import {EMOJIS} from '../const';
import {
  formatLongDate,
  isChecked,
  getDuration
} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';

const SELECTED_EMOJI_MARKUP = `<img width="55" height="55">`;

const createFilmDetailsTemplate = (film) => {
  const {
    title,
    posterSrc,
    releaseDate,
    duration,
    genres,
    director,
    writers,
    actors,
    country,
    description,
    rating,
    age,
    isInWatchlist,
    isWatched,
    isFavourite,
    comments,
  } = film;

  const dateOfRelease = `${formatLongDate(releaseDate)}`;
  const filmDuration = getDuration(duration);

  const filmWriters = writers.join(`, `);
  const filmActors = actors.join(`, `);

  const filmGenres = genres.map((genre) => `<span class="film-details__genre">${genre}</span>`)
  .join(` `);

  const commentEmojis = EMOJIS.map((emoji) => {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`
    );
  }).join(`\n`);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${posterSrc}" alt="">

              <p class="film-details__age">${age}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${title}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmWriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmActors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${dateOfRelease}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${filmDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${filmGenres}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="watchlist"
              name="watchlist"
              ${isChecked(isInWatchlist)}
            >
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="watched"
              name="watched"
              ${isChecked(isWatched)}
            >
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input
              type="checkbox"
              class="film-details__control-input visually-hidden"
              id="favorite"
              name="favorite"
              ${isChecked(isFavourite)}
            >
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title"
              >Comments <span class="film-details__comments-count"
              >${comments.length}</span></h3>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${commentEmojis}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

// ================================================================================

export default class FilmDetails extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  rerender() {
    super.rerender(this);
  }

  recoverListeners() {
    this.setCloseBtnClickHandler(this._closeBtnClickHandler);
    this.setWatchlistBtnClickHandler(this._watchlistBtnClickHandler);
    this.setWatchedBtnClickHandler(this._watchedBtnClickHandler);
    this.setFavouriteBtnClickHandler(this._favouriteBtnClickHandler);
  }

  getEmojiPlacement() {
    const emojiDiv = this.getElement().querySelector(`.film-details__add-emoji-label`);
    emojiDiv.innerHTML = SELECTED_EMOJI_MARKUP;
    return emojiDiv.firstElementChild;
  }

  getElementPreviousToCommentsContainer() {
    return this.getElement().querySelector(`.film-details__comments-title`);
  }

  // ------------------------------- Слушатели -------------------------------

  setCloseBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeBtnClickHandler = handler;
  }

  setWatchlistBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);

    this._watchlistBtnClickHandler = handler;
  }

  setWatchedBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);

    this._watchedBtnClickHandler = handler;
  }

  setFavouriteBtnClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);

    this._favouriteBtnClickHandler = handler;
  }

  setEmojiClickHandler(handler) {
    const emojis = Array.from(this.getElement().querySelectorAll(`.film-details__emoji-label`));

    emojis.forEach((item) => {
      item.addEventListener(`click`, handler);
    });

  }
}
