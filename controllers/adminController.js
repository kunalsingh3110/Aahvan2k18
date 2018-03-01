var Team = require("../models/team");
var CampusAmbassador = require("../models/campusAmbassador");
var TeamLeader = require("../models/teamLeader");
var Event = require("../models/event");
var fs = require('fs');
var json2csv = require('json2csv');
var async = require('async');
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
						service: 'Gmail',
						auth:{
							user: 'aahvaandtu@gmail.com',
							pass: process.env.PASSWORD 
						}
					});
var payment_link = '';
var payment_link_generator = function(name){
	if(name=="Athletics"){
		payment_link='https://www.goeventz.com/event/aahvaan-athletics/41860';
	}else if(name=="Badminton"){
		payment_link='https://www.goeventz.com/event/aahvaan-badminton/41836';
	}else if(name=="Basketball"){
		payment_link='https://www.goeventz.com/event/aahvaan-basketball/41837';
	}else if(name=="Chess"){
		payment_link='https://www.goeventz.com/event/chess-olympiad/41861';
	}else if(name=="Cricket"){
		payment_link='https://www.goeventz.com/event/aahvaan-cricket/41822';
	}else if(name=="Football"){
		payment_link='https://www.goeventz.com/event/aahvaan-football/41805';
	}else if(name=="Handball"){
		payment_link='https://www.goeventz.com/event/aahvaan-handball/64533';
	}else if(name=="Kabaddi"){
		payment_link='https://www.goeventz.com/event/aahvaan-kabaddi/41852';
	}else if(name=="Powerlifting"){
		payment_link='https://www.goeventz.com/event/powerlifting/41979';
	}else if(name=="TableTennis"){
		payment_link='https://www.goeventz.com/event/aahvaan-table-tennis/41839';
	}else if(name=="Tennis"){
		payment_link='https://www.goeventz.com/event/aahvaan-tennis/41859';
	}else if(name=="Volleyball"){
		payment_link='https://www.goeventz.com/event/aahvaan-volleyball/41853';
	}else if(name=="FootSoul"){
		payment_link='https://www.goeventz.com/event/footsoul/41862';
	}else if(name=="Taekwondo"){
		payment_link='https://www.goeventz.com/event/aahvaan-taekwondo/64421';
	}

}
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

exports.events = function(req,res){
	Event.find({}).sort({time:-1}).exec(function(err,events){
		if(err){
			console.log(err);
		}else{
			if(req.session.email){
				res.render("../views/details",{id:5 , events:events});
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
					var data = [];
					teams.forEach(function(team){
						var leader_name = '';
						if(team.leader){
							leader_name = team.leader.name;
						}
						var players_name = [];
						var players_event = [];
						team.players.forEach(function(player){
							players_name.push(player.name);
							players_event.push(player.events);
						});
						data.push({college:team.college,leader:leader_name,captain:team.captain,contact:team.contact,sport:team.sport,gender:team.gender,number_of_players:team.number_of_players,players_name:players_name,players_event:players_event});
					});
					if(req.session.email){
						var fields = ['college','leader','captain','contact','sport','gender','number_of_players','players_name','players_event'];
						json2csv({ data: data, fields: fields }, function(err, csv) {
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
						var data = [];
					teams.forEach(function(team){
						var leader_name = '';
						if(team.leader){
							leader_name = team.leader.name;
						}
						var players_name = [];
						var players_event = [];
						team.players.forEach(function(player){
							players_name.push(player.name);
							players_event.push(player.events);
						});
						data.push({college:team.college,leader:leader_name,captain:team.captain,contact:team.contact,sport:team.sport,gender:team.gender,number_of_players:team.number_of_players,players_name:players_name,players_event:players_event});
					});
					if(req.session.email){
					var fields = ['college','leader','captain','contact','sport','gender','number_of_players','players_name','players_event'];
						json2csv({ data: data, fields: fields }, function(err, csv) {
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
						var data = [];
					teams.forEach(function(team){
						var leader_name = '';
						if(team.leader){
							leader_name = team.leader.name;
						}
						var players_name = [];
						var players_event = [];
						team.players.forEach(function(player){
							players_name.push(player.name);
							players_event.push(player.events);
						});
						data.push({college:team.college,leader:leader_name,captain:team.captain,contact:team.contact,sport:team.sport,gender:team.gender,number_of_players:team.number_of_players,players_name:players_name,players_event:players_event});
					});
					if(req.session.email){
						var fields = ['college','leader','captain','contact','sport','gender','number_of_players','players_name','players_event'];
						json2csv({ data: data, fields: fields }, function(err, csv) {
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
						var data = [];
					teams.forEach(function(team){
						var leader_name = '';
						if(team.leader){
							leader_name = team.leader.name;
						}
						var players_name = [];
						var players_event = [];
						team.players.forEach(function(player){
							players_name.push(player.name);
							players_event.push(player.events);
						});
						data.push({college:team.college,leader:leader_name,captain:team.captain,contact:team.contact,sport:team.sport,gender:team.gender,number_of_players:team.number_of_players,players_name:players_name,players_event:players_event});
					});
					if(req.session.email){
						var fields = ['college','leader','captain','contact','sport','gender','number_of_players','players_name','players_event'];
						json2csv({ data: data, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});	
		}
};


exports.download_events = function(req,res){
	var gender = req.body.sort_gender;
	var event = req.body.sort_events;

	if(gender=="all"&&event=="all"){
			Event.find({}).sort({time: -1}).exec(function(err,teams){
				if(err){
				  console.log(err);
				}else{
						var data = [];
					teams.forEach(function(team){
						var players_name = [];
						var players_event = [];
						team.players.forEach(function(player){
							players_name.push(player.name);
							players_event.push(player.events);
						});
						data.push({college:team.college,captain:team.captain,contact:team.contact,event:team.event,gender:team.gender,number_of_players:team.number_of_players,players_name:players_name,players_event:players_event});
					});
					if(req.session.email){
						var fields = ['college','captain','contact','event','gender','number_of_players','players_name','players_event'];
						json2csv({ data: data, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});			
		}else if(gender=="all"){
				Event.find({event:event}).sort({time: -1}).exec(function(err,teams){
				if(err){
				  console.log(err);
				}else{
						var data = [];
					teams.forEach(function(team){
						var players_name = [];
						var players_event = [];
						team.players.forEach(function(player){
							players_name.push(player.name);
							players_event.push(player.events);
						});
						data.push({college:team.college,captain:team.captain,contact:team.contact,event:team.event,gender:team.gender,number_of_players:team.number_of_players,players_name:players_name,players_event:players_event});
					});
					if(req.session.email){
						var fields = ['college','captain','contact','event','gender','number_of_players','players_name','players_event'];
						json2csv({ data: data, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});	
		}else if(sport=="all"){
			Event.find({gender:gender}).sort({time: -1}).exec(function(err,teams){
				if(err){
				  console.log(err);
				}else{
					var data = [];
					teams.forEach(function(team){
						var players_name = [];
						var players_event = [];
						team.players.forEach(function(player){
							players_name.push(player.name);
							players_event.push(player.events);
						});
						data.push({college:team.college,captain:team.captain,contact:team.contact,event:team.event,gender:team.gender,number_of_players:team.number_of_players,players_name:players_name,players_event:players_event});
					});
					if(req.session.email){
						var fields = ['college','captain','contact','sport','gender','number_of_players','players'];
						json2csv({ data: data, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});	
		}else{
			Event.find({gender:gender,event:event}).sort({time: -1}).exec(function(err,teams){
				if(err){
				  console.log(err);
				}else{
					var data = [];
					teams.forEach(function(team){
						var players_name = [];
						var players_event = [];
						team.players.forEach(function(player){
							players_name.push(player.name);
							players_event.push(player.events);
						});
						data.push({college:team.college,captain:team.captain,contact:team.contact,event:team.event,gender:team.gender,number_of_players:team.number_of_players,players_name:players_name,players_event:players_event});
					});
					if(req.session.email){
						var fields = ['college','captain','contact','event','gender','number_of_players','players_name','players_event'];
						json2csv({ data: data, fields: fields }, function(err, csv) {
    					res.setHeader('Content-disposition', 'attachment; filename=data.csv');
    					res.set('Content-Type', 'text/csv');
    					res.status(200).send(csv);
						});
					}

				}
			});	
		}
	
};

exports.send_mail = function(req,res){
	success = true;
	Event.find({}).exec(function(err,events){
		if(err){
			success = false;
			console.log(err);
		}else{
			events.forEach(function(event){
				if(event.accomodation){
					payment_link = 'https://www.goeventz.com/event/aahvaan-dtu/41210';
				}else{
					payment_link_generator(event.event);
				}
				var players_name = [];
							event.players.forEach(function(player){
								players_name.push(player.name);
							});
						var mailOptions = {
						to: event.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan\'18 Team Registration',
						text: 'Thank you for registering your team in Aahvaan\'18.'+'\n'+
						'Event: '+event.event+'\n'+
						'Captain: '+event.captain+'\n'+
						'Players: '+players_name+'\n'+
						'Amount: Rs. ' + event.amount +'.'+'\n'+
						'Payment Link: '+payment_link+'\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					if(event.amount!=0&&event.amount!=null){
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
				}
		});
		}
		console.log("Events end");
	});
	Team.find({leader:null}).exec(function(err,teams){
		if(err){
			success = false;
			console.log(err);
		}else{
			teams.forEach(function(team){
			var players_name = [];
			if(team.accomodation){
					payment_link = 'https://www.goeventz.com/event/aahvaan-dtu/41210';
				}else{
					payment_link_generator(team.sport);
				}
			team.players.forEach(function(player){
				players_name.push(player.name);
			});
						var mailOptions = {
						to: team.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan\'18 Team Registration',
						text: 'Thank you for registering your team in Aahvaan\'18.'+'\n'+
						'Sport: '+team.sport+'\n'+
						'Captain: '+team.captain+'\n'+
						'Players: '+players_name+'\n'+
						'Amount: Rs. ' + team.amount +'.'+'\n'+
						'Payment Link: '+payment_link+'\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					if(team.amount!=0&&team.amount!=null){
						smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							success = false;
							console.log(err);
						}
					});
					}
					
						
			});
		}
		console.log("Teams end");
	});
	TeamLeader.find({}).exec(function(err,teamLeaders){
		if(err){
			success = false;
			console.log(err);
		}else{
			teamLeaders.forEach(function(teamLeader){
			Team.find({leader: teamLeader}).exec(function(err,teams){
			if(err){
			console.log(err);
			}else{
				var sports = [];
				var payment_links = '';
				var amount = 0;
				teams.forEach(function(team){
				amount = amount + team.amount;
				sports.push(team.sport);
				if(team.accomodation){
					payment_link = 'https://www.goeventz.com/event/aahvaan-dtu/41210';
				}else{
					payment_link_generator(team.sport);
				}
				payment_links = payment_links+'\n'+payment_link;
			});
			var mailOptions = {
						to: teamLeader.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan\'18 Team Registration',
						text: 'Thank you for registering your teams in Aahvaan\'18.'+'\n'+
						'Sports: '+sports+'\n'+
						'Amount: Rs. ' + amount +'.'+'\n'+
						'Payment Links: '+payment_links+'\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					if(amount!=0){
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
				}
				}
				});
				});
				}
		});
	res.json({success:success});
};

