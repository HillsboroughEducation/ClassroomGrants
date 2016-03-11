var UserModel = require('../models/user');

module.exports = function(app, passport) {
	//Authentication Request with passport local strategy
	app.post("/login", passport.authenticate('local-login'), function(req, res) {
		res.json(req.user);
	});

	app.post('/tempLogin', passport.authenticate('local-login-temp'), function(req, res) {
		res.json(req.user);
	});

	app.post('/validateSecurityQuestionAnswer', passport.authenticate('local-login-securityQuestion'), function(req, res) {
		if(req.user == null) {
			console.log("failed");
		}
		res.json(req.user);
	});

	app.post('/logout', function(req, res) {
		req.logOut();
		res.sendStatus(200);
	});

	app.get("/loggedin", function(req, res) {
		res.send(req.isAuthenticated() ? req.user : '0');
	});

	app.post("/checkUsername", function(req, res) {
		UserModel.findOne({username:req.body.username}, function(err, user) {
			if(err) return next(err);
			if(user) {
				res.json({usernameExists:true});
			} else {
				res.json({usernameExists:false});
			}
		});
	});

	app.post("/register", function(req, res) {
		var mode = req.body.mode;
		console.log("Initiated registeration in mode: " + mode)
		var userRole = req.body.userRole;
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
			newUser.password = newUser.generateHash(newUser.password);

			if(mode == 'newUser') {
				newUser.securityAnswer1 = newUser.generateHash(newUser.securityAnswer1);
				newUser.securityAnswer2 = newUser.generateHash(newUser.securityAnswer2);
				newUser.securityAnswer3 = newUser.generateHash(newUser.securityAnswer3);
			}
	
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


	app.get('/getSecurityQuestions', function(req, res) {
		var username = req.query.username;
		UserModel.findOne({username:username}, function(err, user) {
			var securityQuestions = [
				user.securityQuestion1,
				user.securityQuestion2,
				user.securityQuestion3
			];
			res.json(securityQuestions);
		});
	});

	/*
	app.put('/updatePasswordUnprotected', function(req, res) {
		var user = new UserModel;
		var password = req.body.password;
		password = user.generateHash(password);
		var query = {_id:req.body.userId};
		var update = {password:password};
		var options = {new: true};
		
		UserModel.findOneAndUpdate(query, update, options, function(err, user) {
			if(err) {
				res.json(err);
			} else {
				res.json(user);
			}
		});
	});*/

	app.get('/checkForDefaultAdmin', function(req, res) {
		UserModel.findOne({username:'admin'}, function(err, admin) {
			if(admin == null) {
				res.json(false);
			} else {
				res.json(true);
			}
		});
	});

	app.post('/initializeUserAccount', function(req, res) {
		console.log(req.body.user);
		var newUser = new UserModel(req.body.user);
		newUser.password = newUser.generateHash(newUser.password);
		newUser.fullName = newUser.lastName + ', ' + newUser.firstName;

		if(!req.body.isDefaultAdmin) {
			console.log('initializing account for invite');
			console.log(newUser.email);
			UserModel.findOne({email:newUser.email}, function(err, user) {
				console.log(user);
				if(err) { return next(err); }
				if(user) {
					res.json({user:null});
				} else {
					newUser.save(function(err, user) {
						res.json({user:user});
					});
				}
			});
		} else {
			console.log('registering defualt admin');
			newUser.save(function(err, user) {
				res.json(user);
			});
		}
	});

}