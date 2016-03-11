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

router.route('/inviteUser')
	.post(function(req, res) {

		if(req.body.sendInvite == true) {
			var recipient = req.body.user.email;
			var role = req.body.user.role;
			var setupUrl = 'https://salty-springs-8937.herokuapp.com/#/auth/account-setup'

			var mailOptions = {
				from: 'Hillsborough County Education Foundation <hefgrantmailer@gmail.com>',
				to: recipient,
				subject: "Registration Invitation",
				text: "Hi " + req.body.user.firstName + ",\n\n" 
				+ "You are invited to register as a user of the Hillsborough Education Foundation's Classroom"
				+ "Grants application for the role of " + role + ". Please visit the following url and setup" 
				+ " your account.\n\n"
				+ setupUrl + "\n\n"
				+ "Your temporary password is the last four digits of your phone number.\n\n"
				+ "Best Regards,\n" + "Education Foundation Team"
			}

			smptTransport.sendMail(mailOptions, function(error, info) {
				if(error) {
					console.log(error);
					res.json({message: '0'});
				} else {
					console.log("Message sent: " + info.message);
					res.json({message: '1'});
				}
			});
		} else {
			res.json({message:'2'});
		}
	});

module.exports = router;