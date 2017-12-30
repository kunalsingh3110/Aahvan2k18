
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

exports.scores = function(req,res){
	if(req.session.email){
			 res.render("../views/details",{id: 1});
	}else{
			res.render("../views/admin",{alert: false});
	}
};

exports.ca = function(req,res){
	if(req.session.email){
			 res.render("../views/details",{id: 2});
	}else{
			res.render("../views/admin",{alert: false});
	}
};







