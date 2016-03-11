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
	.get(function(req, res) {
		var reviewerId = req.query.reviewerId;
		var status = req.query.status;
		var projectId = req.query.projectId;
		
		if(reviewerId && status) {
			if(status == 'pending') {
				ProjectReviewModel.find({reviewerId: reviewerId, completionDate:null}, function(err, reviews){
					res.json(reviews);
				});
			}
		}

		if(projectId && status) {
			if(status == 'pending') {
				ProjectReviewModel.find({projectId: projectId, completionDate:null}, function(err, reviews){
					res.json(reviews);
				});
			}
		}

		if(projectId && !status) {
			console.log("Looking for reviews with projectId: " + projectId)
			ProjectReviewModel.find({projectId:projectId}, function(err, reviews) {
				res.json(reviews);
			});
		}
	})
	.put(function(req, res) {
		ProjectReviewModel.findOneAndUpdate({_id:req.body.review._id}, req.body.review, function(err, review) {
			res.json(review);
		});
	})
	.post(function(req, res) {
		var newProjectReview = new ProjectReviewModel(req.body.review);
		newProjectReview.save(function(err, review) {
			res.json(review);
		});
	})
	.delete(function(req, res) {
		console.log('hit end point');
		var id = req.query.id;
		console.log(id);
		ProjectReviewModel.remove({_id:id}, function(err, doc) {
			if(err) res.sendStatus(500);
			res.json(doc);
		});
	});

module.exports = router;