var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('validate/login');
})

router.post('/', function(req, res, next) {
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

module.exports = router;
