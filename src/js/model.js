import {getJSON} from "./helper";
import {API_URL} from "./config";
import bookmarksView from "./views/bookmarksView";

export const state = {
      recipe: {},
      search: {
            query: '',
            results: [],
      },
      bookmarks: [],
};

export const loadRecipe = async function (id) {
      try{
            const data = await getJSON(`${API_URL}${id}`);

            const {recipe} = data.data;
            state.recipe = {
                  id: recipe.id,
                  title: recipe.title,
                  publisher: recipe.publisher,
                  sourceUrl: recipe.source_url,
                  image: recipe.image_url,
                  servings: recipe.servings,
                  cookingTime: recipe.cooking_time,
                  ingredients: recipe.ingredients,
            };

            if(state.bookmarks.some(bookmark => bookmark.id === id)){
                  state.recipe.bookmarked = true;
            }
            else{
                  state.recipe.bookmarked = false;
            }

            console.log(state.recipe);
      } catch(err) {
            throw err;
      }
};

export const loadSearchResults = async function (query) {
      try{
            state.search.query = query;
            const data = await getJSON(`${API_URL}?search=${query}`);
            console.log(data);
            state.search.results = data.data.recipes.map(recipe => {
                  return {
                        id: recipe.id,
                        title: recipe.title,
                        publisher: recipe.publisher,
                        image: recipe.image_url
                  }
            });
      }catch (err) {
            throw err;
      }
};

export const updateServings = function (newServings) {
      state.recipe.ingredients.forEach(ingredient => {
            ingredient.quantity = ingredient.quantity * (newServings /state.recipe.servings );
      });

      state.recipe.servings = newServings;
};

const persistBookmarks = function() {
      localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe){
      // Add bookmark
      state.bookmarks.push(recipe);

      // Mark current recipe as bookmark
      if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
      console.log(recipe);
      persistBookmarks();
}

export const deleteBookmark = function (id){
      const index = state.bookmarks.findIndex(el => el.id === id);
      state.bookmarks.splice(index, 1);

      if(id === state.recipe.id) state.recipe.bookmarked = false;
      persistBookmarks();
}

const init = function (){
      const storage = localStorage.getItem('bookmarks');
      if(storage){
         state.bookmarks = JSON.parse(storage);
         bookmarksView.render(state.bookmarks);
      }
}

init();

