var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var hbs = require('hbs'); // view engine for handlebars
var app = express();

mongoose.connect("mongodb://localhost/aahvan2k18", {useMongoClient:true});


//FOR FRONT END, USING HANDLEBARS INSTEAD
// app.set("view engine","ejs");

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

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


//FOR DEVELOPMENT PORT IS 3000
//FOR PRODUCTION PORT IS AUTOMATICALLY DECIDED
const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
	console.log('SERVER HAS STARTED ON PORT:',PORT);
});