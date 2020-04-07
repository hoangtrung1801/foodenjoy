var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
	var recipes = db.get('recipes').value().slice(0,3);
	var tips = db.get('tips').value().slice(0,3);
	var dacSans = db.get('dacSan').value().slice(0,3);
	var newss = db.get('news').value().slice(0,3);

	res.render('index', {
		recipes: recipes,
		tips : tips,
		dacSans : dacSans,
		newss : newss
	});
});

module.exports = router;

