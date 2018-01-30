 $(document).ready(function () {
    $('.modal').modal();
 	 $('#fullpage').fullpage({
 	 	 scrollingSpeed: 1000,
            autoScrolling: true,
            fitToSection: true,
            loopHorizontal: false,
            fitToSectionDelay: 2000,
    				anchors: ['about', 'events', 'ca', 'theme','lookback','live','register'],
    				menu: '#menu',
    				sectionsColor: ['#f2f2f2', '#1BBC9B', '#7E8F7C', '#C63D0F'],
            verticalCentered: false,
    				navigation: true,
    				navigationPosition: 'right',
    				navigationTooltips: ['About Us', 'Events', 'Campus Ambassador','Theme','Lookback','Live','Register'],
    				lazyLoading: true,
    				scrollOverflow: true,

 	 	});

 	$('#about_us').click(function() {
     $.fn.fullpage.moveTo('about', 1);
	});
	$('#event').click(function() {
    $.fn.fullpage.moveTo('events', 1);
	});
	$('#ca2').click(function() {
    $.fn.fullpage.moveTo('ca', 1);
    });
	$('#theme2').click(function() {
    $.fn.fullpage.moveTo('theme', 1);
	});
	$('#lookback2').click(function() {
    $.fn.fullpage.moveTo('lookback', 1);
	});
	$('#live2').click(function() {
    $.fn.fullpage.moveTo('live', 1);
	});
	$('#register2').click(function() {
    $.fn.fullpage.moveTo('register', 1);
	});
    $(".button-collapse").sideNav();

 });

function deleteTeam(id,amount_reduced){
    $('.'+id).hide();
    var amount = Number($('#total_amount').text().substr(10));
    console.log($('#total_amount').text().substr(10));
    amount = amount - Number(amount_reduced);
    if(amount==0){
        $('#pay_contingent').hide();
    }
    $('#total_amount').text("Total: "+"Rs. "+amount);

    $.ajax({
        url: "/delete_team",
        type: "POST",
        data:{id: id},
        success: function(){
            console.log("deleted");
        },
        error: function(err){
            console.log(err);
        }
    });

}
