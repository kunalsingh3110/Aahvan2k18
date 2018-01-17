var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');


var mongoose = require('mongoose');

// global.mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/aahvan2k18",{useMongoClient:true});
// var uri = 'mongodb://kunalsingh2:test1234@ds245287.mlab.com:45287/aahvaan2k18';
// global.db = mongoose.connect(uri);
// global.Schema = mongoose.Schema;



app.set("view engine", "ejs");

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({
	secret: "Secret!!!",
    resave: false,
    saveUninitialized: false
}));


var home = require('./routes/home');
var admin = require('./routes/admin');

app.use('/',home);
app.use('/admin',admin);


const PORT = process.env.PORT || 3000;

app.listen(PORT,process.env.IP,function(){
	console.log("SERVER STARTED ON:",PORT);
});