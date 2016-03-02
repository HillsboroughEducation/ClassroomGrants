var express = require('express');
var passport = require('passport');
var router = express.Router();
var ProjectModel = require('../models/project');

router.use(function(req, res, next) {
	if(!req.isAuthenticated())
		res.sendStatus(401)
	else
		next();
});


router.route('/projects')
	.get(function(req, res) {

		var state = req.query.state;
		var reviewerId = req.query.reviewerId;
		var userId = req.query.userId;
		var projectId = req.query.projectId;

		if(reviewerId) {
			ProjectModel.find({reviewerId:reviewerId}, function(err, projects) {
				res.json(projects);
			});
		} else if(userId) {
			ProjectModel.find({userId:userId}, function(err, projects) {
				res.json(projects);
			});
		} else if(state) {

			if(state == 'inReviewProcess') {
				ProjectModel.find({numReviews:{$lt:3}},function(err, projects) {
					res.json(projects);
				});
			}

			if(state == 'awaitingDecision') {
				ProjectModel.find({projectStatus:'Awaiting Decision'},function(err, projects) {
					res.json(projects);
				});
			}
	
		} else {
			ProjectModel.find(function(err, projects) {
				res.json(projects);
			});
		}
	});


router.route('/project')
	.get(function(req, res) {
		var userId = req.query.userId;
		var projectId = req.query.projectId;

		if(projectId) {
			ProjectModel.findOne({_id:projectId}, function(err, project) {
				res.json(project);
			});
		}

		if(userId) {
			ProjectModel.findOne({userId:userId}, function(err, doc) {
				res.json(doc);
			});
		}
	})
	.put(function(req, res) {
		var id = req.body.project._id;
			ProjectModel.findOneAndUpdate({_id:id}, req.body.project, function(err, doc) {
			res.json(doc);
		});
	})
	.post(function(req, res) {
		console.log(req.body);
		var newProject = new ProjectModel(req.body);
		newProject.save(function(err, project) {
			res.json(project);
		});
	});

router.route('/projectCategories')
	.post(function(req, res) {
		//['STEM', 'Arts']
		var chartData = req.body.chartData;
		var categories = Object.keys(chartData);

		function asyncLoop(i, callback) {
			if(i < categories.length) {
				ProjectModel.find({projectCategory:categories[i]}, function(err, results) {
					var count = results.length
					chartData[categories[i]] = count;
					asyncLoop(i+1,callback);
				});

			} else {
				callback();
			}
		}

		asyncLoop(0, function(){
			res.json(chartData);
		});
		
	});

module.exports = router;