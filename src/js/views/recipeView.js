import icons from 'url:../../img/icons.svg';
import Fraction from 'fraction.js';
import View from './view.js'

class RecipeView extends View {
      _parentElement = document.querySelector('.recipe');
      _errorMessage = 'No recipe found. Please try again!';
      _message = '';

      addHandlerRender(handler){
            ['hashchange','load'].forEach(ev => window.addEventListener(ev, handler));
      }

      addHandlerUpdateServings(handler) {
            this._parentElement.addEventListener('click', function(e) {
                  const btn = e.target.closest('.btn--update-servings');
                  if(!btn) return;
                  console.log(btn);
                  const updateTo = +btn.dataset.updateTo;
                  if(updateTo > 0) handler(updateTo);
            });
      }

      addHandlerAddBookmark(handler) {
            this._parentElement.addEventListener('click', function(e) {
                  const btn = e.target.closest('.btn--bookmark');
                  if (!btn) return;
                  handler();
            });
      }

      _generateMarkup(){
            return `
            <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <span>🕥 </span>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <span>🍛 </span>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings -1}">
                <span>-</span>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings +1}">
                <span>+</span>
              </button>
            </div>
          </div>
          <div class="recipe__info"> </div>
          <div class="recipe__info"> </div>
          <div class="recipe__info">
            <button class="btn--rectangle${this._data.bookmarked ? '-fill' : '' } btn--bookmark">
                <span>🔖🔖🔖</span>
            </button>
          </div>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients.map(ingredient => {
                  return `
              <li class="recipe__ingredient">
              <span>✓ </span>
              <div class="recipe__quantity">${ingredient.quantity ? new Fraction(ingredient.quantity).toFraction() : '' }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit ? ingredient.unit : ''}</span>
                ${ingredient.description}
              </div>
            </li>
              `}).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;

      }
}
export default new RecipeView();