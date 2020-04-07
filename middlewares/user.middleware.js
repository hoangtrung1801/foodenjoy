var db = require('../db');

module.exports = function(req, res, next) {
	var user = db.get('users').find({userId : req.cookies.userId}).value();

	if (req.cookies.userId) {
		res.locals.user = user;
	}
	
	next();
}