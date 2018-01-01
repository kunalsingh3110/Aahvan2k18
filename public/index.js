$(document).ready(function(){
	$('#name_logout').hover(function(){
		text = $(this).text();
		$(this).text("Logout");
	},function(){
		$(this).text(text);
	});

	$('.col').hover(function(){
		$('.col').not(this).toggleClass('scale-down');
		$(this).toggleClass('scale-up');
	});
});
