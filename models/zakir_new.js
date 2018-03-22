var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZakirNewSchema = new Schema({
	name: {type:String , required: true},
	email:{type:String,required:true},
	college:{type:String,default:"DTU"},
	contact:{type:Number,required:true},
	rollNumber:{type:String,required:true},
	idURL:{type:String},
	status:{type:Boolean,default:false},
	uid:{type:Number},
	ticket:{type:String},
	time: {type: Date , default: Date.now}
});

module.exports = mongoose.model('ZakirNew',ZakirNewSchema);