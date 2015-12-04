var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectItemsSchema = new Schema({
	itemName:String,
	quantity:Number,
	cost:Number,
	description:String,
	projectId:String
});

module.exports = mongoose.model('HefProjectItem', ProjectItemsSchema);