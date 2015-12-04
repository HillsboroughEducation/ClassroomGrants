//---NodeJS Library Imports---//
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/test');
//var db = mongoose.connect('mongodb://matt:password123@ds061208.mongolab.com:61208/heroku_27rmsg5b');

var projectsApiController = require('../ClassroomGrants/api/projects.controller.js');
var projectItemsApiController = require('../ClassroomGrants/api/project-items.controller.js');

//---Dependency Injections---//
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer());
app.use(session({secret:'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/projects', projectsApiController);
app.use('/api/items', projectItemsApiController);

//---Passport authentication initializations---//
passport.use(new LocalStrategy(function(username, password, done) 
{
	UserModel.findOne({username:username, password:password}, function(err,user) {
		if(user) {
			return done(null, user);
		}

		return done(null, false, {message:'Unable to login'});
	});
}));

//Object serializers 
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

//Database Models Initializations
var UserModel = require('../ClassroomGrants/models/user');
var ProjectModel = require('../ClassroomGrants/models/project');
var ProjectItemModel = require('../ClassroomGrants/models/budgetItem');

//Authentication API 
app.post("/login", passport.authenticate('local'), function(req, res) {
	console.log("/login");
	console.log(req.user);
	res.json(req.user);
});

app.post('/logout', function(req, res) {
	req.logOut();
	res.sendStatus(200);
});

app.get("/loggedin", function(req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
})

app.post("/register", function(req, res) {
	var newUser = req.body;
	console.log(newUser);
	UserModel.findOne({username:req.body.username}, function(err, user) {

		if(err) { return next(err); }
		if(user) {
			res.json(null);
			return;
		} 

		var newUser = new UserModel(req.body);
		newUser.roles = ['applicant'];
		newUser.save(function(err, user) {
			req.login(user, function(err) {
				if(err) {return next(err); }
				res.json(user);
			});
		});
	});
});

var auth = function(req, res, next) {
	if(!req.isAuthenticated())
		res.sendStatus(401)
	else
		next();
};

//--Database API's--//

//Users Routes
app.get('/rest/users', auth, function(req, res) {
	UserModel.find(function(err, users) {
		res.json(users);
	});
});

//--Project Items Routes--//
app.get('/projectItems/:projectId', function(req, res) {
	var projectId = req.params.projectId;
	console.log(projectId);
	ProjectItemModel.find({projectId:projectId}, function(err, items) {
		console.log(items);
		res.json(items);
	});
});

app.get('/projectItems/item/:id', function(req, res) {
	var id = req.params.id;
	ProjectItemModel.findOne({_id:id}, function(err, item) {
		res.json(item);
	});
});

app.put('/projectItems/item/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	ProjectItemModel.findOneAndUpdate({_id:id}, req.body, function(err, doc) {
		res.json(doc);
	});
});

//--Adds a new budget item to a project--//
app.post('/projectItems/item', function(req, res) {
	console.log(req.body);
	var newProjectItem = new ProjectItemModel(req.body);
	newProjectItem.save(function(err, project) {
		res.json(project);
	});
});

app.delete('/projectItems/item/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	ProjectItemModel.remove({_id: id}, function(err, doc){
		if(err) res.sendStatus(500);
		res.json(doc);
	});
});



var port = process.env.PORT || 8080; 
app.listen(port);	
console.log('Magic happens on port ' + port); 