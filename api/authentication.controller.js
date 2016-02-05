var UserModel = require('../models/user');

module.exports = function(app, passport) {
	//Authentication Request with passport local strategy
	app.post("/login", passport.authenticate('local-signup'), function(req, res) {
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
}