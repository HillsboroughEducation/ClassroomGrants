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
	passport.use('local-login', new LocalStrategy(function(username, password, done) 
	{
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
}