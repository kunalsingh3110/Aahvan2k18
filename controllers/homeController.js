

exports.index = function(req,res){
	res.render("../views/home");
};

exports.register = function(req,res){

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