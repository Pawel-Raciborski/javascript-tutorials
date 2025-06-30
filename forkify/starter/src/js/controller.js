import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // getting hash id
    const id = window.location.hash.slice(1);

    if (!id) {
      return;
    }
    recipeView.renderSpinner();

    await model.loadRecipe(id);
    // 2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(1));
  } catch (err) {
    console.log(err);
  }
};

// listening for hash change
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe); // after page was completely loaded

// instead of this above we can do this
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
