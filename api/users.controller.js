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
	.get(function(req, res) {
		var id = req.params.id;
		UserModel.findOne({_id:id}, function(err, doc) {
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

router.route('/completeRegistration/:userId')
	.put(function(req, res) {
		var id = req.params.userId;
		var user = new UserModel(req.body);
		console.log(user);
		user.password = user.generateHash(user.password);
		user.securityAnswer1 = user.generateHash(user.securityAnswer1);
		user.securityAnswer2 = user.generateHash(user.securityAnswer2);
		user.securityAnswer3 = user.generateHash(user.securityAnswer3);
		console.log(user);
		UserModel.findOneAndUpdate({_id:id}, user, function(err, doc) {
			res.json(doc);
		});
	});

router.route('/updatePassword')
	.put(function(req, res) {
		var user = new UserModel;
		var password = req.body.password;
		password = user.generateHash(password);
		var query = {_id:req.body.userId};
		var update = {password:password};
		var options = {new: true};
		
		UserModel.findOneAndUpdate(query, update, options, function(err, user) {
			if(err) {
				res.json(err);
			} else {
				res.json(user);
			}
		});
	});

module.exports = router;