import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

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

controlRecipes();

// listening for hash change
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe); // after page was completely loaded

// instead of this above we can do this
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
