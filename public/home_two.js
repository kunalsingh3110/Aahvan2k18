 $(document).ready(function () {
     $('.parallax').parallax();
     $(".button-collapse").sideNav();

    $('#about_us').click(function() {
    $('html, body').animate({
        scrollTop: $(".about").offset().top - 80
    }, 1000);
	});
	$('#events').click(function() {
    $('html, body').animate({
        scrollTop: $(".event").offset().top - 80
    }, 1000);
	});
	$('#ca').click(function() {
    $('html, body').animate({
        scrollTop: $(".ca").offset().top - 80
    }, 1000);
	});
	$('#theme').click(function() {
    $('html, body').animate({
        scrollTop: $(".theme").offset().top - 80
    }, 1000);
	});
	$('#lookback').click(function() {
    $('html, body').animate({
        scrollTop: $(".lookback").offset().top - 80
    }, 1000);
	});
	$('#live').click(function() {
    $('html, body').animate({
        scrollTop: $(".live").offset().top - 80
    }, 1000);
	});
	$('#register').click(function() {
    $('html, body').animate({
        scrollTop: $(".register").offset().top - 80
    }, 1000);
	});
	$('#reach').click(function() {
    $('html, body').animate({
        scrollTop: $(".reach").offset().top - 80
    }, 1000);
	});
	var options=[
	{
		selector: '.about' , offset : 80 , callback : function(el){
			$('.about').animate({left: '250px'});
		}
	}
	];
	 Materialize.scrollFire(options);
 });