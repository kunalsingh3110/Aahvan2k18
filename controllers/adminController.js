
exports.index = function(req,res){
	 	if(req.session.email){
			res.render("../views/details",{id: 0});
		}else{
			res.render("../views/admin",{alert: false});
		}
};

exports.post_index = function(req,res){
		var email = req.body.admin_email;
		var password = req.body.admin_password;
		if(email=="adminaahvaan@gmail.com"&&password=="password"){
			req.session.email = email;
			res.render("../views/details",{id: 0});
		}else{
			res.render("../views/admin",{alert: true});
		}
};

exports.details = function(req,res){
		if(req.session.email){
			res.render("../views/details",{id: 0});
		}else{
			res.render("../views/admin",{alert: false});
		}
};

exports.logout = function(req,res){
		if(req.session.email){
			req.session.email = null;
		}
		res.render("../views/admin",{alert: false});
};

exports.teams = function(req,res){
	if(req.session.email){
		  res.render("../views/details",{id: 0});
	}else{
		  res.render("../views/admin",{alert: false});
	}
};

exports.sports = function(req,res){
	if(req.session.email){
			 res.render("../views/details",{id: 1});
	}else{
			res.render("../views/admin",{alert: false});
	}
};

exports.ca = function(req,res){
	var CampusAmbassador = require("../models/campusAmbassador");
	CampusAmbassador.find({}).sort({time: -1}).exec(function(err,campusAmbassadors){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
			 res.render("../views/details",{id: 2 , campusAmbassadors: campusAmbassadors});
		   }else{
			res.render("../views/admin",{alert: false});
			}
		}
	});

};

exports.team_leaders = function(req,res){
	var TeamLeader = require("../models/teamLeader");
	TeamLeader.find({}).sort({time:-1}).exec(function(err,teamLeaders){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
			 	res.render("../views/details",{id: 3 , teamLeaders: teamLeaders});
			}else{
				res.render("../views/admin",{alert: false});
			}
		}
	});
};

exports.scores = function(req,res){
	var sports = req.body.sport;
	if(req.session.email){
		res.render("../views/details",{id:4});
	}else{
		res.render("../views/admin",{alert: false});
	}
};




