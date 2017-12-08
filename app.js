var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

mongoose.connect("mongodb://localhost/aahvan2k18");



app.set("view engine","ejs");
app.use(express.static("public"));
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

app.listen(3000,function(){
	console.log("Server started!!");
});