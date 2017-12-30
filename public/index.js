$(document).ready(function(){
	
	$('#name_logout').hover(function(){
		text = $(this).text();
		$(this).text("Logout");
	},function(){
		$(this).text(text);
	});

	  // $(".nav-link").on("click", function(event) {
   //    $(".nav-link").removeClass("active");
   //    $(this).addClass("active");
   //  });
	// $("#showTeams").on("click" , function(event){
 //  		event.preventDefault();
	// 	event.stopPropagation();
	// 	$.ajax({
	// 		url: "http://localhost:3000/admin/showTeams" , 
	// 		cache: false , 
	// 		data: {
	// 			"password" : "3110"
	// 		},
	// 		dataType: 'json' ,
	// 		success: function(html){
	// 			$("#showDetails").html(html);
	// 		},
	// 		failure: function(err){
	// 			console.log(err);
	// 		}
	// 	});
		
	// });
});