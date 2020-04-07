var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
	var page = parseInt(req.query.page) || 1;

	var perPage = 8; // x
	var start = (page - 1) * perPage;
	var end = page * perPage;

	var tips = db.get('tips').value().slice(start, end);

	res.render('tip', {
		tips : tips,
		page: page
	});
});

router.get('/:id', function (req, res, next) {
	var id = req.params.id;
	var item = db.get('tips').find({tipId : id}).value();
	
	var byUser = db.get('users').find({userId : item.byUserId}).value();
	item.byUser = {};
	item.byUser = byUser;

	var views = item.views + 1;
	db.get('tips').find({tipId : id}).set('views', views).write();

	res.render('blog', {
		item: item
	})

})

module.exports = router;
