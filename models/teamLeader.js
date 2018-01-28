var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamLeaderSchema = new Schema({
	name: {type: String , required: true},
	college: {type: String , required: true},
	number: {type: Number , required: true},
	email: {type: String , required: true , unique: true},
	password: {type: String , requried: true},
	time:{type:Date , default: Date.now},
	tag:{type: String , default: "grey"},
	teams: [{type: Schema.Types.ObjectId , ref: 'Team'}],
	amount:{type: Number , default: 0},
	resetPasswordToken:{type: String},
	resetPasswordExpires:{type: Date}
	});

module.exports = mongoose.model('TeamLeader',TeamLeaderSchema);