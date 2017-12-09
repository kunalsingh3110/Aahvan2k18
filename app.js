var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose.connect("mongodb://localhost/aahvan2k18",{useMongoClient:true});

app.set("view engine", "ejs");

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
	res.render("home");
});

app.get("/register",function(req,res){
	res.render("register");
});

app.post("/registration",function(req,res){
	res.render("/thankyou");
});

app.get("/live",function(req,res){
	res.render("live");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
	console.log("SERVER STARTED ON:",PORT);
});