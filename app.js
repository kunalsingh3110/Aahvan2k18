var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/aahvan2k18",{useMongoClient:true});


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

app.listen(3000,'0.0.0.0',function(){
	console.log("SERVER STARTED ON:",PORT);
});