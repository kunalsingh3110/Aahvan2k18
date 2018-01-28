var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	captain: {type: String , required: true},
	college: {type: String},
	contact: {type: Number , required: true},
	number_of_players: {type: String , required: true},
	leader: {type: Schema.Types.ObjectId , ref: 'TeamLeader'},
	players: [{type:String}],
	gender:{type:String},
	sport: {type:String , required: true},
	time: {type: Date , default: Date.now},
	amount:{type: Number , default: 0},
	tag:{type: String , default: "grey"}
});

module.exports = mongoose.model('Team',TeamSchema);