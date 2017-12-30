var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamLeaderSchema = new Schema({
	name: {type: String , required: true},
	college: {type: String , required: true},
	number: {type: Number , required: true},
	email: {type: String , required: true},
	password: {type: String , requried: true},
	teams: [{type: Schema.Types.ObjectId , ref: 'Team'}]
	});

module.exports = mongoose.model('TeamLeader',TeamLeaderSchema);