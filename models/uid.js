var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UIDSchema = new Schema({
	uid:{type:Number},
	time: {type: Date , default: Date.now}
});

module.exports = mongoose.model('UID',UIDSchema);
