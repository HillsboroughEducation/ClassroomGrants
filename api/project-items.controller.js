var express = require('express');
var passport = require('passport');
var router = express.Router();

var ProjectItemModel = require('../.././ClassroomGrants/models/budgetItem');

router.use(function(req, res, next) {
	console.log("middleware is working");
	if(!req.isAuthenticated())
		res.sendStatus(401)
	else
		next();
});

router.route('/projectItems/:projectId')
	.get(function(req, res) {
		var projectId = req.params.projectId;
		console.log(projectId);
		ProjectItemModel.find({projectId:projectId}, function(err, items) {
			console.log(items);
			res.json(items);
		});
	});

router.route('/projectItems/item')
	.post(function(req, res) {
		console.log(req.body);
		var newProjectItem = new ProjectItemModel(req.body);
		newProjectItem.save(function(err, project) {
			res.json(project);
		});
	});

router.route('/projectItems/item/:id')
	.get(function(req, res) {
		var id = req.params.id;
		ProjectItemModel.findOne({_id:id}, function(err, item) {
			res.json(item);
		});
	})
	.put(function(req, res) {
		var id = req.params.id;
		console.log(req.body.name);
		ProjectItemModel.findOneAndUpdate({_id:id}, req.body, function(err, doc) {
			res.json(doc);
		});
	})
	.delete(function(req, res) {
		var id = req.params.id;
		console.log(id);
		ProjectItemModel.remove({_id: id}, function(err, doc){
			if(err) res.sendStatus(500);
			res.json(doc);
		});
	});

module.exports = router;