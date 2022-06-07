var db = require('../db');

module.exports = function(req, res, next) {
	// Sort popular post
	var recipes = db.get('recipes').value();
	var tips = db.get('tips').value();
	var popularPost = recipes.concat(tips).sort(function (a, b) {
		return a.views - b.views;
	}).slice(0,5);

	// var recipes = db.get('recipes').value();
	// var tips = db.get('tips').value();
	// var popularPost = recipes.concat(tips).slice(0,3);
	
	res.locals.popularPost = popularPost;
	
	next();
}