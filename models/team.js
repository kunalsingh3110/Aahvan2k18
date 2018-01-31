var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	captain: {type: String , required: true},
	college: {type: String},
	contact: {type: Number , required: true},
	number_of_players: {type: String , required: true},
	leader: {type: Schema.Types.ObjectId , ref: 'TeamLeader'},
	email:{type:String , required: true},
	players: [{
		name:{type:String},
		events:[{type:String}]
	}],
	gender:{type:String},
	sport: {type:String , required: true},
	time: {type: Date , default: Date.now},
	amount:{type: Number , default: 0},
	accomodation:{type:Boolean , default:false},
	payment:{type: Boolean , default: false},
	tag:{type: String , default: "grey"}
});

module.exports = mongoose.model('Team',TeamSchema);