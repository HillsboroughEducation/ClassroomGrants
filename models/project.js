var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	schoolName:String,
	projectTitle:String,
	gradeLevel:String,
	titleOneSchool:String,
	numberOfStudents:Number,
	projectCategory:String,
	mosaicProject:String,
	cityOfTampaWaterProject:String,
	goalAndObjective:String,
	measureProjectImpact:String,
	projectStatus:String,
	dateCreated: Date,
	dateResolved: Date,
	userId:String,
	numReviews:Number,
	budgetTotal:Number,
	requiredFieldsCompleted: Boolean,
	awardDecision:String,
});

module.exports = mongoose.model('HefProject', ProjectSchema);