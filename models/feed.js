var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
	img:{
		data: Buffer , contentType: String
	}
});

module.exports = mongoose.model('Feed',FeedSchema);