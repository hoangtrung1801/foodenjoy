var express = require('express');
var db = require('../db');
var shortid = require('shortid');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('validate/reg');
})

router.post('/', function (req, res, next) {
	var id = shortid.generate()
	req.body.userId = id;

	req.body.image = "images/avatardefault.png";
	
	db.get('users').push(req.body).write();
	
	res.cookie('userId', req.body.userId);

	res.redirect('/');
})

module.exports = router;
