var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectReviewSchema = new Schema({
	reviewerName:String,
	reviewerId:String,
	projectId:String,
	projectTitle:String,
	projectCategory:String,
	essay1Score:Number,
	essay1Comments:String,
	essay2Score:Number,
	essay2Comments:String,
	budgetScore:Number,
	budgetComments:String,
	assignedDate: Date,
	completionDate: Date
});

module.exports = mongoose.model('HefProjectReview', ProjectReviewSchema);