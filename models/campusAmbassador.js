var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CampusAmbassadorSchema = new Schema({
	name: {type: String , required: true},
	number: {type: Number , required: true},
	email: {type: String , requires: true},
	college: {type: String , required: true},
	year: {type: String , required: true},
	area: {type: String , required: true},
	why: {type: String , required: true},
	time: {type: Date , default: Date.now}
});

module.exports = mongoose.model('CampusAmbassador',CampusAmbassadorSchema);