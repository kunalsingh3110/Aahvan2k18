var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	captain: {type: String , required: true},
	college: {type: String},
	contact: {type: Number , required: true},
	number_of_players: {type: String , required: true},
	email:{type:String , required: true},
	players: [{type:String}],
	gender:{type:String},
	event: {type:String , required: true},
	time: {type: Date , default: Date.now},
	amount:{type: Number , default: 0},
	accomodation:{type:Boolean , default:false},
	payment:{type: Boolean , default: false},
});

module.exports = mongoose.model('Event',EventSchema);