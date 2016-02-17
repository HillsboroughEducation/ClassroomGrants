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

router.route('/sendRegistrationConfirmation')
	.post(function(req, res) {

		var recipient = req.body.user.email;

		var mailOptions = {
			from: 'Hillsborough County Education Foundation <hefgrantmailer@gmail.com>',
			to: recipient,
			subject: "Thank you for registering",
			text: "Hi " + req.body.user.firstName + ", \n\n" 
			+ "Thank you for registering with us, please login and create your grant application.\n\n"
			+ "Best Regards,\n" + "Education Foundation Team"
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