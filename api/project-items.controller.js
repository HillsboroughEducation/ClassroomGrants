var express = require('express');
var passport = require('passport');
var router = express.Router();

var ProjectItemModel = require('../models/budgetItem');

router.use(function(req, res, next) {
	if(!req.isAuthenticated())
		res.sendStatus(401)
	else
		next();
});

router.route('/budgetItems/:projectId')
	.get(function(req, res) {
		var projectId = req.params.projectId;
		console.log(projectId);
		ProjectItemModel.find({projectId:projectId}, function(err, items) {
			console.log(items);
			res.json(items);
		});
	});

router.route('/budgetItem')
	.get(function(req, res) {
		var id = req.query.id;
		ProjectItemModel.findOne({_id:id}, function(err, item) {
			res.json(item);
		});
	})
	.put(function(req, res) {
		var id = req.body.budgetItem._id;
		ProjectItemModel.findOneAndUpdate({_id:id}, req.body.budgetItem, function(err, doc) {
			res.json(doc);
		});
	})
	.post(function(req, res) {
		console.log(req.body);
		var newProjectItem = new ProjectItemModel(req.body);
		newProjectItem.save(function(err, project) {
			res.json(project);
		});
	})
	.delete(function(req, res) {
		var id = req.query.id;
		ProjectItemModel.remove({_id: id}, function(err, doc){
			if(err) res.sendStatus(500);
			res.json(doc);
		});
	});

module.exports = router;