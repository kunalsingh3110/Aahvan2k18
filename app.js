var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');

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

app.get("/",function(req,res){
	res.render("home");
});

app.get("/register",function(req,res){
	res.render("register");
});

app.post("/registration",function(req,res){
	res.render("thankyou");
});

app.get("/live",function(req,res){
	res.render("live");
});

app.get("/admin",function(req,res){
	if(req.session.email){
		res.render("details");
	}else{
	res.render("admin",{alert: false});
	}
});

app.post("/admin",function(req,res){
	var email = req.body.admin_email;
	var password = req.body.admin_password;
	if(email=="adminaahvaan@gmail.com"&&password=="password"){
		req.session.email = email;
		res.redirect("details");
	}else{
		res.render("admin",{alert: true});
	}
});

app.get("/details",function(req,res){
	if(req.session.email){
		res.render("details");
	}else{
	res.render("admin",{alert: false});
	}
});

app.get("/teams",function(req,res){
	if(req.session.email){
		res.render("teams");
	}else{
	res.render("admin",{alert: false});
	}
});

app.get("/score",function(req,res){
	if(req.session.email){
		res.render("score");
	}else{
	res.render("admin",{alert: false});
	}
});

app.get("/logout",function(req,res){

	if(req.session.email){
		req.session.email = null;
	}
	res.render("admin",{alert: false});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
	console.log("SERVER STARTED ON:",PORT);
});