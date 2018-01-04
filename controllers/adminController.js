var Team = require("../models/team");
var CampusAmbassador = require("../models/campusAmbassador");
var TeamLeader = require("../models/teamLeader");
exports.index = function(req,res){
	Team.find({}).sort({time: -1}).populate('leader').exec(function(err,teams){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
			 res.render("../views/details",{id: 0 , teams:teams});
		   }else{
			res.render("../views/admin",{alert: false});
			}
		}
	});
};

exports.post_index = function(req,res){
		var email = req.body.admin_email;
		var password = req.body.admin_password;
		if(email=="adminaahvaan@gmail.com"&&password=="password"){
			req.session.email = email;
		Team.find({}).sort({time: -1}).populate('leader').exec(function(err,teams){
			if(err){
				console.log(err);
			}else{
				if(req.session.email){
			 		res.render("../views/details",{id: 0 , teams:teams});
		   	}	else{
					res.render("../views/admin",{alert: false});
			}
		}
	});
		}else{
			res.render("../views/admin",{alert: true});
		}
};

exports.details = function(req,res){
	Team.find({}).sort({time: -1}).populate('leader').exec(function(err,teams){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
			 res.render("../views/details",{id: 0 , teams:teams});
		   }else{
			res.render("../views/admin",{alert: false});
			}
		}
	});
};

exports.logout = function(req,res){
		if(req.session.email){
			req.session.email = null;
		}
		res.render("../views/admin",{alert: false});
};

exports.teams = function(req,res){
	Team.find({}).sort({time: -1}).populate('leader').exec(function(err,teams){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
			 res.render("../views/details",{id: 0 , teams:teams});
		   }else{
			res.render("../views/admin",{alert: false});
			}
		}
	});
};

exports.sports = function(req,res){
	if(req.session.email){
			 res.render("../views/details",{id: 1});
	}else{
			res.render("../views/admin",{alert: false});
	}
};

exports.ca = function(req,res){
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

exports.change_tag_ca = function(req,res){
	CampusAmbassador.findById(req.body.id,function(err,campusAmbassador){
			if(err){
				console.log(err);
			}else{
				campusAmbassador.tag = req.body.tag;
				campusAmbassador.save(function(err){
					if(err){
						console.log(err);
					}
				});
			}
	});	
};

exports.change_tag_teamLeader = function(req,res){
	TeamLeader.findById(req.body.id,function(err,teamLeader){
		if(err){
			console.log(err);
		}else{
			teamLeader.tag = req.body.color;
			teamLeader.save(function(err){
				if(err){
					console.log(err);
				}
			});
		}
	});
};

exports.change_tag_team = function(req,res){
	Team.findById(req.body.id,function(err,team){
		if(err){
			console.log(err);
		}else{
			team.tag = req.body.tag;
			team.save(function(err){
				if(err){
					console.log(err);
				}
			});
		}
	});
};
