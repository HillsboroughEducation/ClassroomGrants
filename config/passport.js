var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../models/user');

module.exports = function(passport) {

	//Object serializers 
	passport.serializeUser(function(user, done) {
	    done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	    done(null, user);
	});

	//---Passport authentication initializations---//
	passport.use('local-login', new LocalStrategy({
		usernameField:'username',
		passwordField:'password'
	},
	function(username, password, done) {
		console.log("Attempting to login for username:");
		console.log(username);
		UserModel.findOne({username:username}, function(err,user) {
			if(err) {
				console.log("An error occurred");
				console.log(err);
				return done(err);
			}

			if(!user) {
				console.log("User not found for username");
				return done(null, false, {message:'No user found'});
			}
			
			if(!user.validPassword(password)) {
				console.log("Password was not valid");
				return done(null, false, {message:"Oops! Wrong password"});
			}

			console.log("Success, user logged in.");
			return done(null, user);
		});
	}));

		//---Passport authentication initializations---//
	passport.use('local-login-temp', new LocalStrategy({
		usernameField:'email',
		passwordField:'password'
	},
	function(email, password, done) {
		console.log("Attempting to login for email:");
		console.log(email);
		UserModel.findOne({email:email}, function(err,user) {
			if(err) {
				console.log("An error occurred");
				console.log(err);
				return done(err);
			}

			if(!user) {
				console.log("User not found for username");
				return done(null, false, {message:'No user found'});
			}
			
			if(!user.validPassword(password)) {
				console.log("Password was not valid");
				return done(null, false, {message:"Oops! Wrong password"});
			}

			console.log("Success, user logged in.");
			return done(null, user);
		});
	}));

	passport.use('local-login-securityQuestion', new LocalStrategy({
		usernameField:'username',
		passwordField:'questionAnswer',
		passReqToCallback: true
	},
	function(req, username, questionAnswer, done) {
		console.log("Attempting to login for username:");
		console.log(username);
		UserModel.findOne({username:username}, function(err,user) {
			if(err) {
				console.log("An error occurred");
				console.log(err);
				return done(err);
			}

			if(!user) {
				console.log("User not found for username");
				return done(null, false, {message:'No user found'});
			}
			
			if(!user.validSecurityAnswer(questionAnswer, req.body.questionNumber)) {
				console.log("Password was not valid");
				return done(null, false, {message:"Oops! Invalid Answer"});
			}

			console.log("Success, user logged in.");
			return done(null, user);
		});
	}));


}