var express = require('express');
var passport = require('passport');
var router = express.Router();
var UserModel = require('../models/user');

router.use(function(req, res, next) {
	console.log("middleware is working");
	if(!req.isAuthenticated())
		res.sendStatus(401)
	else
		next();
});

//Users Routes
router.route('/users')
	.get(function(req, res) {
		UserModel.find(function(err, users) {
			res.json(users);
		});
	});

module.exports = router;