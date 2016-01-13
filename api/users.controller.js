var express = require('express');
var passport = require('passport');
var router = express.Router();
var UserModel = require('../models/user');

router.use(function(req, res, next) {
	if(!req.isAuthenticated())
		res.sendStatus(401)
	else
		next();
});

//Users Routes
router.route('/users')
	.get(function(req, res) {
		if(req.query.role) {
			var role = req.query.role;
			UserModel.find({role:role}, function(err, users) {
				res.json(users);
			});
		} else {
			UserModel.find(function(err, users) {
				res.json(users);
			});
		}
	});

router.route('/users/:id')
	.put(function(req, res) {
		var id = req.params.id;
		UserModel.findOneAndUpdate({_id:id}, req.body, function(err, doc) {
			res.json(doc);
		});
	})
	.delete(function(req, res) {
		var id = req.params.id;
		UserModel.remove({_id:id}, function(err, doc) {
			if(err) res.sendStatus(500);
			res.json(doc);
		});
	});

module.exports = router;