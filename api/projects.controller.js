var express = require('express');
var passport = require('passport');
var router = express.Router();
var ProjectModel = require('../../ClassroomGrants/models/project');

router.use(function(req, res, next) {
	console.log("middleware is working");
	if(!req.isAuthenticated())
		res.sendStatus(401)
	else
		next();
});

//--Projects Routes--//
//All routes have Base uri '/api/projects'

router.route('/')
	.get(function(req, res) {
		ProjectModel.find(function(err, projects) {
			res.json(projects);
		});
	})
	.post(function(req, res) {
		console.log(req.body);
		var newProject = new ProjectModel(req.body);
		newProject.save(function(err, project) {
			res.json(project);
		});
	});

router.route('/:id/:idType')
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
		console.log(req.body.name);
		ProjectModel.findOneAndUpdate({_id:id}, req.body, function(err, doc) {
			res.json(doc);
		});
	});

module.exports = router;