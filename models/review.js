var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectReviewSchema = new Schema({
	reviewerId:String,
	projectId:String,
	essay1Score:Number,
	essay1Comments:String,
	essay2Score:Number,
	essay2Comments:String,
	budgetScore:Number,
	budgetComments:String
});

module.exports = mongoose.model('HefProjectReview', ProjectReviewSchema);