var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName:String,
	lastName:String,
	email:String,
	phone:String,
	username:String,
	password:String,
	role:String
});

module.exports = mongoose.model('HefUser', UserSchema);