import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
  module.hot.accept();
}

console.log('Starting...');

const controlRecipe = async function () {
  try{
    const id = window.location.hash.slice(1);
    console.log(id);
    if(!id) return;

    recipeView.renderSpinner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);

  } catch(err){
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try{
    resultsView.renderSpinner();

    //1. Get search query
    const query = searchView.getQuery();
    if(!query) return;

    //2. Load search results
    await model.loadSearchResults(query);

    //3. Render results
    resultsView.render(model.state.search.results);
  }catch(err){
    console.error(err);
  }
};

const controlServings = function (newServings) {
  // Update recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
};

const controlAddBookmark = function() {
  if(!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  }
  else{
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.render(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const init = function(){
  console.log('Init .....');
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);

}

init();


