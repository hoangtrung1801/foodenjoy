var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
	var search = req.query.search;

  	var recipes = db.get('recipes').value().filter(function(recipe) {
  			return recipe.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  	});

  	// matchedBlog.concat(db.get('tips').value().filter(function (tip) {
  	// 	return tip.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  	// }))
  	var tips = db.get('tips').value().filter(function (tip) {
  		return tip.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
  	});
  	
  	var matchedBlog = recipes.concat(tips);
	console.log(recipes, tips)
	res.render('search', {
		recipes : recipes,
		tips : tips
	})  	

});

module.exports = router;

