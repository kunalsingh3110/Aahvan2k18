
var TeamLeader = require("../models/teamLeader");
var Team = require("../models/team");
var Event = require("../models/event");
var Zakir = require("../models/zakir");
var Count = require("../models/count");
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var bcrypt = require('bcrypt');
var multer = require('multer');
var path = require('path');
var multerS3 = require('multer-s3');
var aws = require('aws-sdk'); 
var PDFDocument = require('pdfkit');
var fs = require('fs');
var async = require('async');
const saltRounds = 10;
var smtpTransport = nodemailer.createTransport({
						service: 'Gmail',
						auth:{
							user: 'aahvaandtu@gmail.com',
							pass: process.env.PASSWORD 
						}
					});


aws.config.update({
	secretAccessKey: process.env.AMAZON_KEY,
	accessKeyId: process.env.AMAZON_ID,
	region: 'us-east-1',
	acl: 'public-read'
});

var s3 = new aws.S3();

const storage = multerS3({
	s3:s3,
	bucket: 'zakiraahvaannew',
	key: function(req,file,cb){
		cb(null,file.originalname+'-'+Date.now());
	}
});

 const upload = multer({
 	storage: storage,
 	limits:{fileSize: 1000000},
 	fileFilter: function(req,file,cb){
 		checkFileType(file,cb);
 	}

 }).single('screenshot');


function checkFileType(file,cb){
	const fileTypes = /jpeg|jpg|png|gif/;
	const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = fileTypes.test(file.mimetype);

	if(mimetype && extname){
		return cb(null,true);
	}else{
		cb('Error in uploading images!!');
	}
}


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
	var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
				res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});
	
};

// exports.home_two = function(req,res){
// 	res.render("../views/home_two",{username: req.session.username , userid: req.session.userid});
// }

// exports.home_three = function(req,res){
// 	res.render("../views/home_three",{username: req.session.username , userid: req.session.userid});
// }

exports.my_teams = function(req,res){
	if(req.session.username){
		var amount = 0;
		TeamLeader.findById(req.session.userid,function(err,teamLeader){
			if(err){
				console.log(err);
			}else{
		Team.find({leader: teamLeader}).sort({time: -1}).exec(function(err,teams){
			if(err){
			console.log(err);
			}else{
				teams.forEach(function(team){
					amount = amount + team.amount;
				});
			res.render("../views/my_teams",{username: req.session.username , userid: req.session.userid , teams:teams , amount: amount});	
		}
		});
		}
		});
	}else{
		res.render("../views/login",{alert: 0 , username: req.session.username , userid: req.session.userid});
	}
};

exports.get_register_events = function(req,res){
		var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

}

exports.register_events = function(req,res){
	res.render("../views/register_events",{alert: false , username:req.session.username , userid: req.session.userid , event: req.body.event_name});
};

exports.register_events_teams = function(req,res){

		var cap_phone = Number(req.body.captain_number);
		var number = Number(req.body.number_of_players);
		var events_name = req.body.event_name;
		if(isNaN(cap_phone)){
					res.render("../views/register_sports",{alert:1 , event:req.body.event_name, username: req.session.username , userid: req.session.userid});
		}else{
			var accomodation = false;
					if(req.body.accomodation){
						accomodation = true;
						payment_link = 'https://www.goeventz.com/event/aahvaan-dtu/41210';
					}else{
						payment_link_generator(events_name);						
					}
					var payment_links_array = [];
					payment_links_array.push(payment_link);
					var players = [];
					for(var i=0;i<req.body.number_of_players;i++){
						var player_name = "player_name"+(i);
						var select='';
						if(events_name="Taekwondo"){
						select = "select_events"+(i);
					}
						players.push({name: req.body[player_name],events:req.body[select]});
					}

				Event.create(
					{captain: req.body.captain_name,
					 college:req.body.college_name,
					 contact: req.body.captain_number,
					 email: req.body.team_email,
					 number_of_players: req.body.number_of_players,
					 gender: req.body.gender,
					 players: players,
					 accomodation: accomodation,
					 amount: req.body.amount,
					 event: req.body.event_name},function(err,event){
						if(err){
							console.log(err);
						}else{
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
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
							res.render("../views/thankyou",{username:req.session.username,userid:req.session.userid,links:payment_links_array});
						}
					});					

				}



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
										res.render("../views/home",{username: req.session.username , userid: req.session.userid,number_of_teams:0});
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
		res.render("../views/register_teams",{username: req.session.username , userid: req.session.userid});
};

exports.post_register_teams = function(req,res){
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
			case 10: sports_name = "TableTennis";
					break;
			case 11: sports_name = "Tennis";
					break;
			case 12: sports_name = "Volleyball";
					break;	
			default: sports_name=" ";																				
		}
	res.render("../views/register_sports",{alert:0 , sports_name:sports_name , username: req.session.username , userid: req.session.userid});
};


exports.register_sports = function(req,res){
		var sports_name = "Athletics";
		res.render("../views/register_sports",{alert:0 , sports_name:sports_name , username: req.session.username , userid: req.session.userid});
};

exports.post_register_sports = function(req,res){
		var Team = require("../models/team");
		var cap_phone = Number(req.body.captain_number);
		var number = Number(req.body.number_of_players);
		var sports_name = req.body.sports_name;

		if(isNaN(cap_phone)){
					res.render("../views/register_sports",{alert:1 , sports_name:req.body.sports_name, username: req.session.username , userid: req.session.userid});
		}else{
			var accomodation = false;
					if(req.body.accomodation){
						accomodation = true;
						payment_link = 'https://www.goeventz.com/event/aahvaan-dtu/41210';
					}else{
						payment_link_generator(sports_name);
					}
					var payment_links_array = [];
					payment_links_array.push(payment_link);
			if(!req.session.username){
					var players = [];
					for(var i=0;i<req.body.number_of_players;i++){
						var player_name = "player_name"+(i);
						var select='';
						if(sports_name=="Athletics"){
						 select = "select_events"+(i);
					}else if(sports_name="Powerlifting"){
						select = "select_category"+(i);
					}
						players.push({name: req.body[player_name],events:req.body[select]});
					}
					Team.create(
					{captain: req.body.captain_name,
					 college:req.body.college_name,
					 contact: req.body.captain_number,
					 email: req.body.team_email,
					 number_of_players: req.body.number_of_players,
					 gender: req.body.gender,
					 players: players,
					 accomodation: accomodation,
					 amount: req.body.amount,
					 sport: req.body.sports_name},function(err,team){
						if(err){
							console.log(err);
						}else{
							var players_name = [];
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
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
							res.render("../views/thankyou",{username:req.session.username,userid:req.session.userid,links:payment_links_array});
						}
					});

			}else{
				TeamLeader.findById(req.session.userid , function(err,teamLeader){
				if(err){
					console.log(err);
				}else{
					var players = [];
					for(var i=0;i<req.body.number_of_players;i++){
						var player_name = "player_name"+(i);
						var select='';
						if(sports_name=="Athletics"){
						 select = "select_events"+(i);
					}else if(sports_name="Powerlifting"){
						select = "select_category"+(i);
					}
						players.push({name: req.body[player_name],events:req.body[select]});
					}
					Team.create(
					{captain: req.body.captain_name,
					college: teamLeader.college,
					 contact: req.body.captain_number,
					 email: teamLeader.email,
					 number_of_players: req.body.number_of_players,
					 leader: teamLeader,
					 gender: req.body.gender,
					 accomodation:accomodation,
					 amount: req.body.amount,
					 players: players,
					 sport: req.body.sports_name},function(err,team){
						if(err){
							console.log(err);
						}else{
								var number_of_teams=0;
								Team.find({leader:teamLeader}).exec(function(err,teams){
								number_of_teams = teams.length;
								res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
								});
								
						}
					});
				}
			});
		}
	}
	
		
};

exports.login = function(req,res){
	if(req.session.username){
	var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

		}else{
	res.render("../views/login",{alert: 0 , username: req.session.username , userid: req.session.userid});
	}
};

exports.post_login = function(req,res){
	if(req.session.username){
				var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

		}else{
	TeamLeader.findOne({email: req.body.leader_email} , function(err,teamLeader){
			if(err){
				res.render("../views/login",{alert:1 , username: req.session.username , userid: req.session.userid});
			}else{
				if(teamLeader){
					bcrypt.compare(req.body.leader_password,teamLeader.password,function(err,check){
						if(check){
							req.session.username = teamLeader.name;
							req.session.userid = teamLeader._id;
								var number_of_teams=0;
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});

						}else{
							res.render("../views/login",{alert:1 , username: req.session.username , userid: req.session.userid});
						}
					});
				}else{
					res.render("../views/login",{alert:1 , username: req.session.username , userid: req.session.userid});
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
	res.render("../views/home",{username:req.session.username , userid: req.session.userid,number_of_teams:0});
};

exports.campus_ambassador = function(req,res){
	res.render("../views/campus_ambassador_form",{alert:0 , username: req.session.username , userid: req.session.userid});
};

exports.post_campus_ambassador = function(req,res){
		var CampusAmbassador = require("../models/campusAmbassador");
		var ca_phone = Number(req.body.ca_number);
		if(isNaN(ca_phone)){
			res.render("../views/campus_ambassador_form",{alert:1 , username: req.session.username , userid: req.session.userid});
		}else{
			CampusAmbassador.findOne({email: req.body.ca_email},function(err,campusAmbassador){
				if(err){
					res.render("../views/campus_ambassador_form",{alert:1 , username: req.session.username , userid: req.session.userid});
				}else{

					if(campusAmbassador){
						res.render("../views/campus_ambassador_form",{alert:2 , username: req.session.username , userid: req.session.userid});	
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
				 					res.render("../views/campus_ambassador_form",{alert:1 , username: req.session.username , userid: req.session.userid});
				 				}else{
				 		var mailOptions = {
						to: CampusAmbassador.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan\'18 Campus Ambassador',
						text: 'Thank you for applying for Campus Ambassador.'+'\n'+
						'Looking forward to working with you.'+'\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
				 		res.render("../views/thankyou_campus_ambassador" , {username: req.session.username , userid: req.session.userid});
				 				}
				 			}
						);
					}
				}
			});
			
		}
};

exports.forgot_password = function(req,res){
	if(req.session.username){
	var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

	}else{
		res.render("../views/forgot_password",{alert: 0 , username: req.session.username , userid: req.session.userid});
	}
};

exports.send_token = function(req,res){
	var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

}

exports.post_send_token = function(req,res){
	var email = req.body.user_email;
	TeamLeader.findOne({email:email},function(err,teamLeader){
		if(err){
			res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
		}else{
			if(teamLeader){
					crypto.randomBytes(20,function(err,buf){
						if(err){
							console.log(err);
						}else{
						  var token = buf.toString('hex');
					teamLeader.resetPasswordToken = token;
					teamLeader.resetPasswordExpires = Date.now() + 3600000;

					teamLeader.save(function(err){
						if(err){
							res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
						}
					});

					

					var mailOptions = {
						to: teamLeader.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan\'18 Contingent Leader Password Reset',
						text: 'You are receiving this because you (or someone else) has requested for the reset of the password.'+'\n'+
						'Please click on the following link or paste into your browser to complete the process.'+'\n'+
						'http://'+req.headers.host+'/reset_password/'+token+'\n\n'+
						'If you not request this , please ignore and your password will remain unchanged.'+'\n'+
						'This token is valid only for one hour.'+'\n\n'+
						'Regards,'+'\n'+
						'Team Aahvaan' 
					};
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
							res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
						}else{
							res.render("../views/forgot_password_sent",{useremail:teamLeader.email,username: req.session.username , userid: req.session.userid});
						}
					});
			}
					});
			
			}else{
				res.render("../views/forgot_password",{alert:2 , username: req.session.username , userid: req.session.userid});
			}
		}
	});
}

exports.reset_password = function(req,res){
	TeamLeader.findOne({resetPasswordToken: req.params.token , resetPasswordExpires: {$gt: Date.now()}},function(err,teamLeader){
		if(err){
			console.log(err);
			res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
		}else{
			if(teamLeader){
				res.render("../views/reset_password",{alert: 0 , token:req.params.token,username: req.session.username , userid: req.session.userid});
			}else{
				res.render("../views/forgot_password",{alert:3 , username: req.session.username , userid: req.session.userid});
			}
		}
	});
};	

exports.post_reset_password = function(req,res){
	if(req.body.leader_password != req.body.leader_password_confirm){
			res.render("../views/reset_password",{alert: 1 , token:req.body.token,username: req.session.username , userid: req.session.userid});
	}else{
	TeamLeader.findOne({resetPasswordToken: req.body.token , resetPasswordExpires: {$gt: Date.now()}},function(err,teamLeader){
		if(err){
			console.log(err);
			res.render("../views/forgot_password",{alert:1 , username: req.session.username , userid: req.session.userid});
		}else{
			if(teamLeader){
				bcrypt.genSalt(saltRounds,function(err,salt){
				if(err){
					res.render("../views/forgot_password",{alert: 1 , username: req.session.username , userid: req.session.userid});
				}else{
					bcrypt.hash(req.body.leader_password,salt,function(err,hash){
						if(err){
							res.render("../views/forgot_password",{alert: 1 , username: req.session.username , userid: req.session.userid});
						}else{
							teamLeader.password = hash;
							teamLeader.resetPasswordToken = undefined;
							teamLeader.resetPasswordExpires = undefined;

							teamLeader.save(function(err){
								if(err){
									res.render("../views/forgot_password",{alert: 1 , username: req.session.username , userid: req.session.userid});
								}else{
									res.render("../views/login",{alert: 2 , username:req.session.username , userid: req.session.userid});
								}
							});
						}
					});
			}});
			}else{
				res.render("../views/forgot_password",{alert:3 , username: req.session.username , userid: req.session.userid});
			}
		}
	});

}

};


exports.thankyou = function(req,res){
		var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

};

exports.thankyou_ca = function(req,res){
		var number_of_teams=0;
	TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			Team.find({leader:teamLeader}).exec(function(err,teams){
				number_of_teams = teams.length;
					res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
			});
		}else{
			res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
		}
	});

};

exports.contingent_submit = function(req,res){
		var amount = 0;
		var sports = [];
		var payment_links = '';
		var payment_links_array = [];
		TeamLeader.findById(req.session.userid,function(err,teamLeader){
		if(teamLeader){
			if(err){
				console.log(err);
			}else{
		Team.find({leader: teamLeader}).sort({time: -1}).exec(function(err,teams){
			if(err){
			console.log(err);
			}else{
				teams.forEach(function(team){
				amount = amount + team.amount;
				sports.push(team.sport);
				if(team.accomodation){
					payment_link = 'https://www.goeventz.com/event/aahvaan-dtu/41210';
				}else{
					payment_link_generator(team.sport);
				}
				payment_links = payment_links+'\n'+payment_link;
				payment_links_array.push(payment_link);
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
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});
					res.render("../views/thankyou",{username:req.session.username,userid:req.session.userid,links:payment_links_array});
		}
	});
	}
	}else{
		var number_of_teams=0;
		res.render("../views/home",{username: req.session.username , userid: req.session.userid , number_of_teams:number_of_teams});
	}
	});	

};

exports.delete_team = function(req,res){
	Team.findById(req.body.id,function(err,team){
		if(err){
			console.log(err);
		}else{
			team.remove();
		}
	});
};

exports.register_zakir = function(req,res){
	
			Count.findOne({check:1}).exec(function(err,count){
				if(err){
					console.log(err);
				}
				if(count){
					res.render("../views/register_zakir",{alert:0  , username: req.session.username , userid: req.session.userid , count_dtu:count.dtu, count_other:count.other});
				}else{
					res.render("../views/register_zakir",{alert:2  , username: req.session.username , userid: req.session.userid , count_dtu:count.dtu, count_other:count.other});
				}
			});

	

};

exports.post_register_zakir = function(req,res){

		var count_dtu = req.body.count_dtu;
		var count_other = req.body.count_other;

	Zakir.findOne({email:req.body.email}).exec(function(err,zakir){
		if(zakir){
			res.render("../views/register_zakir",{alert:3  , username: req.session.username , userid: req.session.userid,count_dtu:count_dtu, count_other:count_other});
		}else{
			var phone = Number(req.body.contact_number);
			if(isNaN(phone)){
				res.render("../views/register_zakir",{alert:1  , username: req.session.username , userid: req.session.userid,count_dtu:count_dtu, count_other:count_other});
			}else{
				Zakir.create({
					name: req.body.name,
					email: req.body.email,
					college: req.body.college_name,
					contact: phone,
					gender: req.body.gender
				},function(err,zakirnew){
					if(err){
						console.log(err);
						res.render("../views/register_zakir",{alert:2 , username: req.session.username , userid: req.session.userid,count_dtu:count_dtu, count_other:count_other});
					}else{

					var link = 'http://'+req.headers.host+'/upload_screenshot';
					var mailOptions = {
						to: zakirnew.email,
						from: 'aahvaandtu@gmail.com',
						subject: 'Aahvaan\'18 Zakir Khan Registration',
						text: 'Thank you for registration'+'\n'+
								'Next Steps are:'+'\n'+
								'1. Download and sign up on Viintro app using'+'\n'+
								'Play Store: http://bit.ly/DTUdroid'+'\n'+
								'Apple Store: http://apple.co/2BJdMBw'+'\n'+
								'2. Make profile video expressing your love towards Zakir.'+'\n'+
								'3. Take screenshot of your profile.'+'\n'+
								'4. Upload screenshot on '+link+'\n'+
								'5. Registration will be final only after the above mentioned steps are completed.'+'\n'+
								'6. There are limited number of tickets available.'+'\n'+
								'Thus please complete all the above mentioned steps as soon as possible.'+'\n'+
							
								'Regards,'+'\n'+
								'Team Aahvaan' 
					};
					smtpTransport.sendMail(mailOptions,function(err){
						if(err){
							console.log(err);
						}
					});



						res.render("../views/info_zakir",{username:req.session.username,userid:req.session.userid,link:link});
					}
				});
			}
		}
	});


};

exports.upload_screenshot = function(req,res){

	res.render("../views/upload_screenshot",{alert:0  , username: req.session.username , userid: req.session.userid});

};

exports.post_upload_screenshot = function(req,res){
			var counts;
			Count.findOne({check:1}).exec(function(err,count){
				if(count){
					counts = count;
				}
			});

			upload(req,res,function(err){
				if(err){
					console.log(err);
					res.render("../views/upload_screenshot",{alert:2  , username: req.session.username , userid: req.session.userid});
				}else{
					Zakir.findOne({email:req.body.user_email,status:false}).exec(function(err,zakirold){
						if(err){
							res.render("../views/upload_screenshot",{alert:2  , username: req.session.username , userid: req.session.userid});
						}else{
						if(zakirold){
							Zakir.findOne({profileURL:req.body.profile_url}).exec(function(err,zakirprofile){
								if(err){
									console.log(err);
									res.render("../views/upload_screenshot",{alert:2  , username: req.session.username , userid: req.session.userid});
								}else{
								if(zakirprofile){
									res.render("../views/upload_screenshot",{alert:4  , username: req.session.username , userid: req.session.userid});
								}else{
			   				 var checkuid = false;

							 async.whilst(function(){
							 	return !checkuid;
							 },
							 function(next){
							   var college = zakirold.college;
							 	if(counts){
							 		if(counts.dtu>2300||counts.other>400){
							 			res.render("../views/upload_screenshot",{alert:3  , username: req.session.username , userid: req.session.userid});
									}else{
							 	var uid = Math.floor(100000 + Math.random() * 900000);
							 		Zakir.findOne({uid:uid}).exec(function(err,zakir){
							 		if(err){
							 			res.render("../views/upload_screenshot",{alert:2 , username: req.session.username , userid: req.session.userid});
							 			console.log(err);
							 			
							 		}else{
							 			if(zakir){
							 				next();
							 			}else{
							 				checkuid = true;
							 				zakirold.uid = uid;
							 				zakirold.profileURL = req.body.profile_url;
											zakirold.screenshotURL = req.file.location;
											zakirold.status = true;
							 				zakirold.save(function(err){
							 					if(err){
							 						res.render("../views/upload_screenshot",{alert:2 , username: req.session.username , userid: req.session.userid});
							 						console.log(err);
							 						
							 					}else{
							 							if(college=="DTU"){
							 								counts.dtu = counts.dtu + 1;
							 							}else{
							 								counts.other = counts.other + 1;
							 							}
							 							counts.save(function(err){
							 								if(err){
							 									console.log(err);
							 									
							 								}
							 							});
							 						res.render("../views/ticket",{alert:0  , username: req.session.username , userid: req.session.userid , email:zakirold.email});
							 					}
							 				});
							 			}
							 		}
							 	});
							 	}
							 }else{
		
							 		res.render("../views/upload_screenshot",{alert:2 , username: req.session.username , userid: req.session.userid});
									
							 }
							 },
							 function(err){
							 	res.render("../views/upload_screenshot",{alert:2 , username: req.session.username , userid: req.session.userid});
							 	console.log(err);
							 });
							 	}
							}
							});
							}else{
								
								res.render("../views/upload_screenshot",{alert:1 , username: req.session.username , userid: req.session.userid});
							 }
							}
							 });
							}
						});
};


exports.zakir_dtu = function(req,res){
		
			Count.findOne({check:1}).exec(function(err,count){
				if(count){


		Zakir.findOne({email:req.body.email}).exec(function(err,zakir){
			if(err){
				console.log(err);
				res.render("../views/upload_screenshot",{alert:0  , username: req.session.username , userid: req.session.userid});
			}else{
				if(zakir){
					var name = zakir.name;
					var email = zakir.email;
					var profile_url = zakir.profileURL;
					var gender = zakir.gender;
					var college = zakir.college;
					var status = ' ';
					var slot = ' ';
					var uid = zakir.uid;
					
						if(college=="DTU"){
							if(count.dtu>2300){
								status = 'Invalid';
								slot = ' ';
							}else if(count.dtu>2100){
								status = 'Waiting';
								slot = '26th March 02:00 pm - 03:00 pm';		
							}else if(count.dtu<=2100){
								status = 'Confirm';
								slot = '24th March 2018 11:00 am - 02:00 pm';
							}
						}else{
							if(count.other>400){
								status = 'Invalid';
								slot = ' ';
							}else{
								status = 'Confirm';
								slot = '26th March 12:00 pm - 01:30 pm';
							}
						}
					


				doc = new PDFDocument();
				doc.pipe(res);
				

 				doc.image('public/images/AV.png', {
   					fit: [50, 50],
   					align: 'center',
   					valign: 'center'
				});

 				doc.fontSize(25)
  				   .text(uid,100,85,{
  				   	align: 'right'
  				   });

  				doc.moveDown(2);

  				 doc.fontSize(16)
  				 	.text('Name: '+name,{
  				 		align: 'left'
  				 	});



  				 doc.fontSize(20)
  				 	.text(college,100,172,{
  				 		align: 'right'
  				 	});

  				 doc.moveDown(1.5);


  				 doc.fontSize(16)
  				 	.text('Gender: '+gender,{
  				 		align: 'left'
  				 	});


  				  doc.moveDown(1.5);
  				 

  				 doc.fontSize(16)
  				 	.text('Email: '+email,{
  				 		align: 'left'
  				 	});

  				  doc.moveDown(1.5);

  				 doc.fontSize(16)
  				 	.text('ProfileURL: '+profile_url,{
  				 		align: 'left'
  				 	});
				 doc.moveDown(1.5);

				  doc.fontSize(16)
  				 	.fillColor('red')
  				 	.text('Slot:  '+slot,{
  				 		align: 'left'
  				 	});

  				 if(status=='Confirm'){

  				  doc.fontSize(16)
  				  	.fillColor('green')
  				 	.text('Status: '+status,100,365,{
  				 		align: 'right'
  				 	});
  				 }else{
  				 	 doc.fontSize(16)
  				  	.fillColor('red')
  				 	.text('Status: '+status,100,365,{
  				 		align: 'right'
  				 	});
  				 }
  				 	

  				doc.moveDown(8);

  				doc.image('public/images/Sign.png', {
   					fit: [50, 50],
   					align: 'center',
   					valign: 'center'
				});

				doc.moveDown(0.1);

				 doc.fontSize(16)
				 .fillColor('black')
  				 	.text('Authorised Signatory',{
  				 		align: 'left'
  				 	});




  				 doc.addPage();

  				 doc.fontSize(20)
  				 	.fillColor('black')
  				 	.text('INSTRUCTIONS',{
  				 		align: 'center',
  				 		underline: true
  				 	});

  				 doc.moveDown(2);


  				 doc.fontSize(16)
  				 	.text('1. Bring your ticket with government issued ID proof (College ID for DTU students) for verification at the above mentioned time slot.'
  				 		+'If anyone fails to do so, his/her confirmed ticket will be passed on to the waiting ticket holders.',{
  				 		align: 'justify'
  				 	});

  				 doc.moveDown(1);
  				  
  				 doc.fontSize(16)
  				 	.text('2. It is mandatory to show Viintro app and profile video at the registration desk.'
  				 	 +'If app is not installed or video is not as required, confirmed ticket will be cancelled and it will be passed on to the waiting ticket holders.'
  				 	 +'Waiting ticket holders need to meet the same requirements.',{
  				 		align: 'justify'
  				 	});

  				   doc.moveDown(1);

  				 doc.fontSize(16)
  				 	.text('3. Make sure you meet all the requirements before arriving at the registration desk. Otherwise, your ticket will be cancelled and excuses will not be entertained..',{
  				 		align: 'justify'
  				 	});

  				 	 doc.moveDown(1);



  				 doc.fontSize(16)
  				 	.text('4. One pass will be issued against each validated ticket at the entrance gate of show\'s venue.',{
  				 		align: 'justify'
  				 	});

  				 	doc.moveDown(1);

  				 	 doc.fontSize(16)
  				 	.text('5. It is compulsory to carry a print out of the ticket generated.',{
  				 		align: 'justify'
  				 	});

  				 	 doc.moveDown(1);

  				  doc.fontSize(16)
  				 	.text('6. This ticket will be generated only once.'+
  				 		'Please make sure to download it.',{
  				 		align: 'justify'
  				 	});	 

  				 	doc.moveDown(3);

  				 	doc.image('public/images/Sign.png', {
   					fit: [50, 50],
   					align: 'center',
   					valign: 'center'
				});


				doc.moveDown(0.1);

				 doc.fontSize(16)
  				 	.text('Authorised Signatory',{
  				 		align: 'left'
  				 	});

				doc.end();
			}else{
				
				res.render("../views/upload_screenshot",{alert:0  , username: req.session.username , userid: req.session.userid});
			}
			}
		});
		}
	});
};

// exports.make_pdf_get = function(req,res){
// 	res.render("../views/ticket",{alert:0 , username: req.session.username, userid: req.session.userid,email:'123'});
// };
// exports.make_pdf = function(req,res){
// 	var uid = Math.floor(100000 + Math.random() * 900000);
// 	var name ='Kunal Singh';
// 	var email ='singh.kunal112@gmail.com';
// 	var profile_url = 'https://www.fslncvsjlvjskclcka.com';
// 	var slot = '2:00-3:00 pm';
// 	var status = 'Confirm';
// 	var gender = 'Male';
// 	doc = new PDFDocument();
// 				doc.pipe(res);
// 				// doc.rect(doc.x, 0, 410, doc.y).stroke();
 				


//  				doc.image('public/images/AV.png', {
//    					fit: [50, 50],
//    					align: 'center',
//    					valign: 'center'
// 				});

//  				doc.fontSize(25)
//   				   .text(uid,100,85,{
//   				   	align: 'right'
//   				   });

//   				doc.moveDown(2);

//   				 doc.fontSize(16)
//   				 	.text('Name: '+name,{
//   				 		align: 'left'
//   				 	});



//   				 doc.fontSize(20)
//   				 	.text('DTU',100,172,{
//   				 		align: 'right'
//   				 	});

//   				 doc.moveDown(1.5);


//   				 doc.fontSize(16)
//   				 	.text('Gender: '+gender,{
//   				 		align: 'left'
//   				 	});


//   				  doc.moveDown(1.5);
  				 

//   				 doc.fontSize(16)
//   				 	.text('Email: '+email,{
//   				 		align: 'left'
//   				 	});

//   				  doc.moveDown(1.5);

//   				 doc.fontSize(16)
//   				 	.text('ProfileURL: '+profile_url,{
//   				 		align: 'left'
//   				 	});
// 				 doc.moveDown(1.5);

// 				  doc.fontSize(16)
//   				 	.fillColor('red')
//   				 	.text('Slot:  '+slot,{
//   				 		align: 'left'
//   				 	});

//   				  doc.fontSize(16)
//   				  	.fillColor('green')
//   				 	.text('Status: '+status,100,365,{
//   				 		align: 'right'
//   				 	});
  				 	

//   				 	doc.moveDown(8);
//   				 	doc.image('images/Sign.png', 320, 145, width: 200, height: 100)
//    					.text('Stretch', 320, 130);



//   				 doc.addPage();

//   				 doc.fontSize(20)
//   				 	.fillColor('black')
//   				 	.text('INSTRUCTIONS',{
//   				 		align: 'center',
//   				 		underline: true
//   				 	});

//   				 doc.moveDown(2);


//   				 doc.fontSize(16)
//   				 	.text('1. Bring the ticket with your ID proof(College ID for DTU students)'+ 
//   				 		' at the requested slot time.',{
//   				 		align: 'justify'
//   				 	});

//   				 doc.moveDown(1);
  				  
//   				 doc.fontSize(16)
//   				 	.text('2. If anyone fails to do so his/her ticket will be passed on to the waiting members.',{
//   				 		align: 'justify'
//   				 	});

//   				   doc.moveDown(1);

//   				 doc.fontSize(16)
//   				 	.text('3. It is mandatory to show Winotro app and profile video at the entrance gate.',{
//   				 		align: 'justify'
//   				 	});

//   				 	 doc.moveDown(1);

//   				 doc.fontSize(16)
//   				 	.text('4. If found that app is not installed or the profile video is not appropriate the ticket will be cancelled.',{
//   				 		align: 'justify'
//   				 	});

//   				 	doc.moveDown(4);
//   				 	doc.image('public/images/Sign.png', {
//    					fit: [50, 50],
//    					align: 'center',
//    					valign: 'center'
// 				});
// 				doc.end();
// };	

// exports.live = function(req,res){
// 	res.render("../views/live" , {username: req.session.username , userid: req.session.userid});
// };


// exports.carousel = function(req, res) {
// 	res.render("../views/carousel", {
//     username: req.session.username,
//     userid: req.session.userid
//   });











