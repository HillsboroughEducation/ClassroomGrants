var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	schoolName:String,
	schoolAddress:String,
	schoolCity:String,
	schoolState:String,
	schoolZip:String,
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
	userId:String
	reviewerId: String,
	numbReviewers: Number,
	reviews: [String],
});

module.exports = mongoose.model('HefProject', ProjectSchema);