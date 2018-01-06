
var TeamLeader = require("../models/teamLeader");
var bcrypt = require('bcrypt');
const saltRounds = 10;
exports.index = function(req,res){
	res.render("../views/home",{username: req.session.username , userid: req.session.userid});
};

exports.register = function(req,res){
	if(req.session.username){
		res.render("../views/register_teams",{username: req.session.username , userid: req.session.userid});
	}else{
	res.render("../views/register" , {alert: 0 , username: req.session.username , userid: req.session.userid});
	}
};

exports.post_register = function(req,res){
	if(req.session.username){
		res.render("../views/register_teams",{username: req.session.username , userid: req.session.userid});
	}else{
	var leader_phone = Number(req.body.leader_number);
	if(isNaN(leader_phone)){
		res.render("../views/register",{alert: 1 , username: req.session.username , userid: req.session.userid});
	}else{
		TeamLeader.findOne({email: req.body.leader_email} , function(err,teamLeader){
			if(teamLeader){
				res.render("../views/register",{alert: 3 , username: req.session.username , userid: req.session.userid});
			}else{
				bcrypt.genSalt(saltRounds,function(err,salt){
				if(err){
					res.render("../views/register",{alert: 2 , username: req.session.username , userid: req.session.userid});
				}else{
					bcrypt.hash(req.body.leader_password,salt,function(err,hash){
						if(err){
							res.render("../views/register",{alert: 2 , username: req.session.username , userid: req.session.userid});
						}else{
						TeamLeader.create(
							{name: req.body.leader_name,
			 				college: req.body.leader_college,
			 				number: req.body.leader_number,
			 				email: req.body.leader_email,
			 				password: hash
							}, function(err,teamLeader){
									if(err){
										res.render("../views/register",{alert: 2 , username: req.session.username , userid: req.session.userid});
									}else{
										req.session.username = teamLeader.name;
										req.session.userid = teamLeader._id;
										res.render("../views/home",{username: req.session.username , userid: req.session.userid});
									}
					   			}
							);
					}
					});
				}
				});
				
			}
		});
		
	}
}
};

exports.register_teams = function(req,res){
	if(req.session.username){
		res.render("../views/register_teams",{username: req.session.username , userid: req.session.userid});
	}else{
		res.render("../views/login",{alert:false , username: req.session.username , userid: req.session.userid});
	}
};

exports.post_register_teams = function(req,res){
		if(!req.session.username){
			res.render("../views/login",{alert: false , username: req.session.username , userid: req.session.userid});
	}else{
		var sports_number = Number(req.body.sport);
		var sports_name=' ';
		switch(sports_number){
			case 1: sports_name = "Athletics";
					break;
			case 2: sports_name = "Badminton";
					break;
			case 3: sports_name = "Basketball";
					break;
			case 4: sports_name = "Chess";
					break;
			case 5: sports_name = "Cricket";
					break;
			case 6: sports_name = "Football";
					break;
			case 7: sports_name = "Handball";
					break;
			case 8: sports_name = "Kabaddi";
					break;
			case 9: sports_name = "Powerlifting";
					break;
			case 10: sports_name = "Table Tennis";
					break;
			case 11: sports_name = "Tennis";
					break;
			case 12: sports_name = "Volleyball";
					break;	
			default: sports_name=" ";																				
		}
		if(req.session.username){
				res.render("../views/register_sports",{alert:false , sports_name:sports_name , username: req.session.username , userid: req.session.userid});
		}else{
			res.render("../views/login",{alert:false , username: req.session.username , userid: req.session.userid});
		}
	}
};


exports.register_sports = function(req,res){
		var sports_name = "Athletics";
		if(req.session.username){
		res.render("../views/register_sports",{alert:false , sports_name:sports_name , username: req.session.username , userid: req.session.userid});
	}else{
		res.render("../views/login",{alert:false , username: req.session.username , userid: req.session.userid});
	}
};

exports.post_register_sports = function(req,res){
	if(!req.session.username){
			res.render("../views/login",{alert: false , username: req.session.username , userid: req.session.userid});
	}else{
		var Team = require("../models/team");
		var cap_phone = Number(req.body.captain_number);
		if(isNaN(cap_phone)){
					res.render("../views/register_sports",{alert:true , sports_name:req.body.sports_name, username: req.session.username , userid: req.session.userid});
		}else{
			TeamLeader.findById(req.session.userid , function(err,teamLeader){
				if(err){
					console.log(err);
				}else{
					var players = [];
					for(var i=0;i<req.body.number_of_players;i++){
						var player_name = "player_name"+(i);
						players.push(req.body[player_name]);
					}
					Team.create(
					{captain: req.body.captain_name,
					college: teamLeader.college,
					 contact: req.body.captain_number,
					 number_of_players: req.body.number_of_players,
					 leader: teamLeader,
					 players: players,
					 sport: req.body.sports_name},function(err,team){
						if(err){
							console.log(err);
						}else{
							res.render("../views/thankyou",{username:req.session.username,userid:req.session.userid});
						}
					});
				}
			});
		}
	}
};

exports.login = function(req,res){
	if(req.session.username){
			res.render("../views/home",{username: req.session.username , userid: req.session.userid});
		}else{
	res.render("../views/login",{alert: false , username: req.session.username , userid: req.session.userid});
	}
};

exports.post_login = function(req,res){
	if(req.session.username){
			res.render("../views/home",{username: req.session.username , userid: req.session.userid});
		}else{
	TeamLeader.findOne({email: req.body.leader_email} , function(err,teamLeader){
			if(err){
				res.render("../views/login",{alert:true , username: req.session.username , userid: req.session.userid});
			}else{
				if(teamLeader){
					bcrypt.compare(req.body.leader_password,teamLeader.password,function(err,check){
						if(check){
							req.session.username = teamLeader.name;
							req.session.userid = teamLeader._id;
							res.render("../views/home",{username: req.session.username , userid: req.session.userid});
						}else{
							res.render("../views/login",{alert:true , username: req.session.username , userid: req.session.userid});
						}
					});
				}else{
					res.render("../views/login",{alert:true , username: req.session.username , userid: req.session.userid});
				}
			}
	});
}
};	


exports.logout = function(req,res){
	if(req.session.username){
		req.session.username = null;
		req.session.userid = null;	
	}
	res.render("../views/home",{username:req.session.username , userid: req.session.userid});
};

exports.campus_ambassador = function(req,res){
	res.render("../views/campus_ambassador_form",{alert:false , username: req.session.username , userid: req.session.userid});
};

exports.post_campus_ambassador = function(req,res){
		var CampusAmbassador = require("../models/campusAmbassador");
		var ca_phone = Number(req.body.ca_number);
		if(isNaN(ca_phone)){
			res.render("../views/campus_ambassador_form",{alert:true , username: req.session.username , userid: req.session.userid});
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
				 		res.render("../views/campus_ambassador_form",{alert:true , username: req.session.username , userid: req.session.userid});
				 	}else{
				 		res.render("../views/thankyou_campus_ambassador" , {username: req.session.username , userid: req.session.userid});
				 	}
				 }
				);
		}
};

exports.live = function(req,res){
	res.render("../views/live" , {username: req.session.username , userid: req.session.userid});
};