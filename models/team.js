var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	captain: {type: String , required: true},
	number_of_players: {type: String , required: true},
	leader: {type: Schema.Types.ObjectId , ref: 'TeamLeader'},
	players: [{type:String}],
	sport: {type:String , required: true}
});

module.exports = mongoose.model('Team',TeamSchema);