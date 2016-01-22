var express = require('express');
var passport = require('passport');
var router = express.Router();

var ProjectReviewModel = require('../models/review');

router.use(function(req, res, next) {
	if(!req.isAuthenticated())
		res.sendStatus(401)
	else
		next();
});

router.route('/projectReview')
	.post(function(req, res) {
		console.log(req.body);
		var newProjectReview = new ProjectReviewModel(req.body.review);
		newProjectReview.save(function(err, review) {
			res.json(review);
		});
	});

module.exports = router;