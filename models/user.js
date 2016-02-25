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

module.exports = mongoose.model('HefUser', UserSchema);