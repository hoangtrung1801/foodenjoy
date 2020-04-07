var express = require('express');
var db = require('../db');
var router = express.Router();
var shortid = require('shortid');
var multer  = require('multer');
var fs = require("fs");
var path = require("path");

var upload = multer({ dest: './public/uploads/' });
var upload_image = require("../public/javascripts/image_upload.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('create-blog', {
		// user : res.locals.user
	});
});

router.post('/', upload.single('image'), function (req, res, next) {
	req.body.image = req.file.path.split('\\').slice(1).join('\\');
	req.body.byUserId = req.cookies.userId;
	req.body.views = 0;

	var ingredients = req.body.ingredients;
	if (Array.isArray(ingredients)) {
		req.body.ingredients = ingredients.filter(function (temp) {
			if (temp != '') return temp;
		})	
	} else {
		var temp = [];
		temp.push(ingredients);
		req.body.ingredients = temp;
	}

	var steps = req.body.steps;
	if (Array.isArray(steps)) {
		req.body.steps = steps.filter(function (temp) {
			if (temp != '') return temp;
		})	
	} else {
		var temp = [];
		temp.push(steps);
		req.body.steps = temp;
	}

	if(req.body.category === 'recipe') {
		req.body.recipeId = shortid.generate();
		db.get('recipes')
		  .push(req.body)
		  .write();

		 res.redirect('/');
	} else if (req.body.category === 'tip') {
		req.body.tipId = shortid.generate();
		db.get('tips')
		  .push(req.body)
		  .write();
		res.redirect('/');	
	}

})

router.post("/image-upload", function (req, res) {
	upload_image(req, function(err, data) {
		if (err) {
			return res.status(404).end(JSON.stringify(err));
		}
		console.log(data);
		res.send(data);
	});
});

var filesDir = './public/uploads/';

if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}


module.exports = router;
