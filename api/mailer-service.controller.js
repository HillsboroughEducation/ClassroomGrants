var express = require('express');
var passport = require('passport');
var nodemailer = require('nodemailer');
var router = express.Router();

var smptTransport = nodemailer.createTransport("SMTP", {
	service:"Gmail",
	auth:{
		user: "hefgrantsmailer@gmail.com",
		pass: "Changeme!"
	}
});

router.route('/send')
	.get(function(req, res) {
		var mailOptions = {
			from: 'No Reply <hefgrantmailer@gmail.com>',
			to: "matthewstivali@gmail.com",
			subject: "test",
			text: "this is a test"
		}

		smptTransport.sendMail(mailOptions, function(error, info) {
			if(error) {
				console.log(error);
				res.json({error: error});
			} else {
				console.log("Message sent: " + info.message);
				res.json({message: info.message});
			}
		});
	});

module.exports = router;