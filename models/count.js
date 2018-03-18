var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountSchema = new Schema({
	dtu:{type:Number},
	other:{type:Number},
	check:{type:Number,default:0}
});

module.exports = mongoose.model('Count',CountSchema);
