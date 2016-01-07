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

		if(reviewerId) {
			console.log('finding projects with reviewerId: ' + reviewerId);
			ProjectModel.find({reviewerId:reviewerId}, function(err, projects) {
				res.json(projects);
			});
		}

		if(status) {
			console.log('finding projects with status: ' + status);
			ProjectModel.find({projectStatus:status}, function(err, projects) {
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

router.route('/projects/:id/:idType')
	.get(function(req, res) {
		var id = req.params.id;
		var idType = req.params.idType;

		if(idType === 'project')
		{
			ProjectModel.findOne({_id:id}, function(err, project){
				res.json(project);
			});
		}

		if(idType === 'user')
		{
			ProjectModel.find({userId:id}, function(err, projects) {
				console.log(projects);
				res.json(projects);
			});
		}
	
	})
	.put(function(req, res) {
		var id = req.params.id;
		ProjectModel.findOneAndUpdate({_id:id}, req.body, function(err, doc) {
			res.json(doc);
		});
	});

module.exports = router;