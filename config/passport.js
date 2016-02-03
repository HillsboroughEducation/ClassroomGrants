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
	passport.use('local-signup', new LocalStrategy(function(username, password, done) 
	{
		UserModel.findOne({username:username}, function(err,user) {
			if(user.validPassword) {
				return done(null, user);
			}

			return done(null, false, {message:'Unable to login'});
		});
	}));
}