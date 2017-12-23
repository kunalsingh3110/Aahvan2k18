
exports.index = function(req,res){
	 	if(req.session.email){
			res.render("details");
		}else{
			res.render("admin",{alert: false});
		}
};

exports.post_index = function(req,res){
		var email = req.body.admin_email;
		var password = req.body.admin_password;
		if(email=="adminaahvaan@gmail.com"&&password=="password"){
			req.session.email = email;
			res.render("../views/details");
		}else{
			res.render("../views/admin",{alert: true});
		}
};

exports.details = function(req,res){
		if(req.session.email){
			res.render("../views/details");
		}else{
			res.render("../views/admin",{alert: false});
		}
};

exports.logout = function(req,res){
		if(req.session.email){
			req.session.email = null;
		}
		res.render("admin",{alert: false});
};