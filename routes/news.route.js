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
router.get('/', function (req, res, next) {
	var news = db.get('news').value();

	res.render('news', {
		data: news
	});
})

router.get('/blog/:id', function (req, res, next) {	
	var id = req.params.id;
	var item = db.get('news').find({newsId : id}).value();
	console.log(item);
	var byUser = db.get('users').find({userId : item.byUserId}).value();
	item.byUser = {};
	item.byUser = byUser;

	var views = item.views + 1;
	db.get('news').find({newsId : id}).set('views', views).write();

	res.render('news-blog', {
		item : item
	});
})

router.get('/create', function (req, res, next) {
	res.render('create-news-blog');
})

router.post('/create', upload.single('image'), function (req, res, next) {
	req.body.image = req.file.path.split('\\').slice(1).join('\\');
	req.body.byUserId = req.cookies.userId;
	req.body.newsId = shortid.generate();
	req.body.views = 0;

	db.get('news')
	  .push(req.body)
	  .write();

	res.redirect('/news');
})

router.post("/image-upload", function (req, res) {
	upload_image(req, function(err, data) {
		if (err) {
			return res.status(404).end(JSON.stringify(err));
		}

		res.send(data);
	});
});

var filesDir = './public/uploads/';

if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}

module.exports = router;
