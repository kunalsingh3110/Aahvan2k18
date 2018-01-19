var Team = require("../models/team");
var CampusAmbassador = require("../models/campusAmbassador");
var TeamLeader = require("../models/teamLeader");
var Feed = require("../models/feed");
var fs = require('fs');
var json2csv = require('json2csv');
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
		if(email=="aahvaandtu@gmail.com"&&password==process.env.ADMIN_PASSWORD){
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

exports.feeds = function(req,res){
	Feed.find({}).sort({time:-1}).exec(function(err,feeds){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
				res.render("../views/details",{id:5 , feeds:feeds});
			}else{
				res.render("../views/admin",{alert: false});
			}

		}
		});		
};

exports.download_ca = function(req,res){
	CampusAmbassador.find({}).sort({time: -1}).exec(function(err,campusAmbassadors){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
				var fields = ['college','name','number','email','year','area','why'];
				json2csv({ data: campusAmbassadors, fields: fields }, function(err, csv) {
    			res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    			res.set('Content-Type', 'text/csv');
    			res.status(200).send(csv);
				});
			}
		}
  });
};

exports.download_teamLeader = function(req,res){
	TeamLeader.find({}).sort({time:-1}).exec(function(err,teamLeaders){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
				var fields = ['college','name','number','email'];
				json2csv({ data: teamLeaders, fields: fields }, function(err, csv) {
    			res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    			res.set('Content-Type', 'text/csv');
    			res.status(200).send(csv);
				});
			}
		}
	});
};

exports.download_teams = function(req,res){
	var gender = req.body.sort_gender;
	var sport = req.body.sort_sports;
		if(gender=="all"&&sport=="all"){
			Team.find({}).sort({time: -1}).populate('leader').exec(function(err,teams){
				if(err){
				  console.log(err);
				}else{
					if(req.session.email){
						var fields = ['college','captain','contact','sport','gender','number_of_players','players'];
						json2csv({ data: teams, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});			
		}else if(gender=="all"){
				Team.find({sport:sport}).sort({time: -1}).populate('leader').exec(function(err,teams){
				if(err){
				  console.log(err);
				}else{
					if(req.session.email){
						var fields = ['college','captain','contact','sport','gender','number_of_players','players'];
						json2csv({ data: teams, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});	
		}else if(sport=="all"){
			Team.find({gender:gender}).sort({time: -1}).populate('leader').exec(function(err,teams){
				if(err){
				  console.log(err);
				}else{
					if(req.session.email){
						var fields = ['college','captain','contact','sport','gender','number_of_players','players'];
						json2csv({ data: teams, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});	
		}else{
			Team.find({gender:gender,sport:sport}).sort({time: -1}).populate('leader').exec(function(err,teams){
				if(err){
				  console.log(err);
				}else{
					if(req.session.email){
						var fields = ['college','captain','contact','sport','gender','number_of_players','players'];
						json2csv({ data: teams, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});	
		}
};




