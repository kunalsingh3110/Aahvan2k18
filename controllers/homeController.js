

exports.index = function(req,res){
	res.render("../views/home",{username: req.session.username , userid: req.session.userid});
};

exports.register = function(req,res){
	res.render("../views/register" , {alert: 0});
};

exports.post_register = function(req,res){
	var TeamLeader = require("../models/teamLeader");
	var leader_phone = Number(req.body.leader_number);
	if(isNaN(leader_phone)){
		res.render("../views/register",{alert: 1});
	}else{
		TeamLeader.create(
			{name: req.body.leader_name,
			 college: req.body.leader_college,
			 number: req.body.leader_number,
			 email: req.body.leader_email,
			 password: req.body.leader_password
			} , function(err,TeamLeader){
				if(err){
					res.render("../views/register",{alert: 2});
				}else{
					req.session.username = TeamLeader.name;
					req.session.userid = TeamLeader._id;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid});
				}
			}
			);
	}
};

exports.login = function(req,res){
	res.render("../views/login",{alert: false});
};

exports.post_login = function(req,res){

};	

exports.campus_ambassador = function(req,res){
	res.render("../views/campus_ambassador_form",{alert:false});
};

exports.post_campus_ambassador = function(req,res){
		var CampusAmbassador = require("../models/campusAmbassador");
		var ca_phone = Number(req.body.ca_number);
		if(isNaN(ca_phone)){
			res.render("../views/campus_ambassador_form",{alert:true});
		}else{
			CampusAmbassador.create(
				{name: req.body.ca_name,
				 number: req.body.ca_number,
				 email: req.body.ca_email,
				 college: req.body.ca_college,
				 year: req.body.ca_year,
				 area: req.body.ca_area,
				 why: req.body.ca_why} , function(err,CampusAmbassador){
				 	if(err){
				 		res.render("../views/campus_ambassador_form",{alert:true});
				 	}else{
				 		res.render("../views/thankyou_campus_ambassador");
				 	}
				 }
				);
		}
};

exports.live = function(req,res){

};