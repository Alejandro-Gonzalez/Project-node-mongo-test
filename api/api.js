var auth = require('./auth.js');
var get  = require('./get.js');
var findRecipes  = require('./findRecipes.js');
var newRecipe  = require('./newRecipe.js');

exports.init = app => {
  auth.init(app)
  get.init(app)
  findRecipes.init(app)
  newRecipe.init(app)
};

