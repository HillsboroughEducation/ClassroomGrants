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

//--Projects Routes--//
//All routes have Base uri '/api/projects'
router.route('/projects')
	.get(function(req, res) {

		var status = req.query.status;
		var reviewerId = req.query.reviewerId;
		var userId = req.query.userId;
		var projectId = req.query.projectId;

		if(reviewerId) {
			ProjectModel.find({reviewerId:reviewerId}, function(err, projects) {
				res.json(projects);
			});
		} else if(status) {
			ProjectModel.find({projectStatus:status}, function(err, projects) {
				res.json(projects);
			});
		} else if(userId) {
			ProjectModel.find({userId:userId}, function(err, projects) {
				res.json(projects);
			});
		} else {
			ProjectModel.find(function(err, projects) {
				res.json(projects);
			});
		}
	})
	.post(function(req, res) {
		console.log(req.body);
		var newProject = new ProjectModel(req.body);
		newProject.save(function(err, project) {
			res.json(project);
		});
	});

router.route('/project')
	.get(function(req, res) {
		var userId = req.query.userId;
		var projectId = req.query.projectId;

		if(projectId) {
			ProjectModel.findOne({_id:projectId}, function(err, doc) {
				res.json(doc);
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
	});

module.exports = router;