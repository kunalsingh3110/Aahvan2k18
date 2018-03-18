var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZakirSchema = new Schema({
	name: {type:String , required: true},
	email:{type:String,required:true},
	college:{type:String,required:true},
	contact:{type:Number,required:true},
	gender:{type:String,required:true},
	profileURL:{type:String},
	screenshotURL:{type:String},
	status:{type:Boolean,default:false},
	uid:{type:Number},
	ticket:{type:String},
	time: {type: Date , default: Date.now}
});

module.exports = mongoose.model('Zakir',ZakirSchema);