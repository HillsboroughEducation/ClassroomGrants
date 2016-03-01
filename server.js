//---Node Module Imports---//
var express = require('express');
var app = express();
var port = process.env.PORT || 8080; 
var mongoose = require('mongoose');
var passport = require('passport');
			   require('./config/passport.js')(passport);

var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var projectsApiController = require('./api/projects.controller.js');
var projectItemsApiController = require('./api/project-items.controller.js');
var usersApiController = require('./api/users.controller.js');
var reviewsApiController = require('./api/project-reviews.controller.js');
var mailerService = require('./api/mailer-service.controller.js');

//Db connection
var configDb = require('./config/database.js');
mongoose.connect(configDb.remoteDbUrl);

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
app.use('/reviewsApi', reviewsApiController);
app.use('/mailerService', mailerService);

require('./api/authentication.controller.js')(app, passport);

app.listen(port);	
console.log('Listening on port ' + port); 