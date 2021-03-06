var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName:String,
	lastName:String,
	fullName:String,
	street:String,
	city:String,
	state:String,
	zip:String,
	email:String,
	phone:String,
	username:String,
	password:String,
	role:String,
	securityQuestion1:String,
	securityAnswer1:String,
	securityQuestion2:String,
	securityAnswer2:String,
	securityQuestion3:String,
	securityAnswer3:String,
});

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.validSecurityAnswer = function(answer, questionNumber) {
	if(questionNumber == 1) {
		return bcrypt.compareSync(answer, this.securityAnswer1);
	} else if(questionNumber == 2) {
		return bcrypt.compareSync(answer, this.securityAnswer2);
	} else if(questionNumber == 3) {
		return bcrypt.compareSync(answer, this.securityAnswer3);
	}
}

module.exports = mongoose.model('HefUser', UserSchema);