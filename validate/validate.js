var express = require('express');
var router = express.Router();
var db = require('../db');
var shortid = require('shortid');

/* GET home page. */
router.get('/login', function (req, res, next) {
	res.render('validate/login');
})

router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	var data = db.get('users').find({email : email}).value();
	
	if(!data) {
		res.render('validate/login', {
			errors: ["Không có email này !"]
		})
	} else if (password !== data.password) {
		res.render('validate/login', {
			errors: ["Mật khẩu sai !"]
		})
	}

	res.cookie('userId', data.userId);

	res.redirect('/');

})

router.get('/register', function (req, res, next) {
	res.render('validate/reg');
})

router.post('/register', function (req, res, next) {
	var id = shortid.generate()
	req.body.userId = id;

	req.body.image = "images/avatardefault.png";
	
	db.get('users').push(req.body).write();
	
	res.cookie('userId', req.body.userId);

	res.redirect('/');
})

router.get('/log-out', function (req, res, next) {
	res.clearCookie('userId');

	res.redirect('/');
})

module.exports = router;
