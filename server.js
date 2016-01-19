//---Node Module Imports---//
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var projectsApiController = require('./api/projects.controller.js');
var projectItemsApiController = require('./api/project-items.controller.js');
var usersApiController = require('./api/users.controller.js');

//Database connection strings
var db = mongoose.connect('mongodb://localhost/test');
//var db = mongoose.connect('mongodb://matt:password123@ds027345.mongolab.com:27345/heroku_75j1vt1j');

//---Dependency Invocations---//
var app = express();
app.use(express.static(__dirname + "/public_html"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer());
app.use(session({secret:'this is the secret'}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/projectsApi', projectsApiController);
app.use('/projectItemsApi', projectItemsApiController);
app.use('/usersApi', usersApiController);

//User Models Initialization
var UserModel = require('./models/user');

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

//Authentication Request with passport local strategy
app.post("/login", passport.authenticate('local'), function(req, res) {
	res.json(req.user);
});


app.post('/logout', function(req, res) {
	req.logOut();
	res.sendStatus(200);
});

app.get("/loggedin", function(req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
})

app.post("/register/:userRole", function(req, res) {
	var mode = req.body.mode;
	console.log("Initiated registeration in mode: " + mode)
	var userRole = req.params.userRole;
	console.log('Registering user with type: ' + userRole);
	UserModel.findOne({username:req.body.user.username}, function(err, user) {

		//Checks to see if username already exists
		if(err) { return next(err); }
		if(user) {
			res.json(null);
			return;
		} 

		var newUser = new UserModel(req.body.user);
		console.log(newUser);
		newUser.role = userRole;
		newUser.fullName = newUser.lastName + ', ' + newUser.firstName;
		newUser.save(function(err, user) {
			if(mode == 'newUser') {
				req.login(user, function(err) {
					if(err) {return next(err); }
					res.json(user);
				});
			}
			else if(mode == 'admin') {
				res.json(user);
			}
		});
	});
});

var port = process.env.PORT || 8080; 
app.listen(port);	
console.log('Magic happens on port ' + port); 