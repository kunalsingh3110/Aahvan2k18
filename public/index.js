$(document).ready(function(){

$('#Events').on("click",function() {
  jQuery("html, body").animate({scrollTop:  $("#particles-js").offset().top }, 2000);   
});

$('#Theme').on("click",function() {
  jQuery("html, body").animate({scrollTop:  $(".theme").offset().top }, 2000);   
});

$('#Lookback').on("click",function() {
  jQuery("html, body").animate({scrollTop:  $(".lookback").offset().top }, 2000);   
});




  window.onscroll = () => {
    const nav = document.querySelector('.navbar');
    // console.log(document.body.scrollTop);
    // console.log(this.scrollY);
    if(document.body.scrollTop >= 100) nav.classList.add('scroll');
    else nav.classList.remove('scroll');
  };

  function zoomIn() {
    console.log('clicked');
    alert('sdfa');
    // document.getElementById("overlay").style.display = "block";
  }

    $('html, body').hide();

        if (window.location.hash) {
            setTimeout(function() {
                $('html, body').scrollTop(0).show();
                $('html, body').animate({
                    scrollTop: $(window.location.hash).offset().top
                    }, 1000)
            }, 0);
        }
        else {
            $('html, body').show();
        }


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

$('#number').on('input',function(){
  $('.team-players').empty();
  var players = $(this).val();
  for(var i=0;i<players;i++){
    $('.team-players').append("<input type='text' class='form__input' id='player"+(i)+"' name='player_name"+(i)+"' placeholder='Enter Player "+(i+1)+" Name' required='true'><label for='number' class='form__label'>Enter Player "+(i+1)+" Name</label>");
}
});

$('.circle-grey').on('click',function(){
  $(this).parent().css("background","grey");
    var name = $(this).parent().attr('name');
    var type = name.split(' ').slice(-1).join(' ');
    var route = '';
    if(type=="TeamLeader"){
      route = "change_tag_teamLeader";
    }else if(type=="Team"){
      route = "change_tag_team";
    }else if(type=="CampusAmbassador"){
      route = "change_tag_ca";
    }
       $.ajax({
      url: '/admin/'+route,
      type: 'POST',
      data: {id: name.split(' ').slice(0, -1).join(' ') , color: "grey"},
      success: function(data){
      },
      error: function(err){
      }
    });
   
});

$('.circle-green').on('click',function(){
    $(this).parent().css("background","#006400");
    var name = $(this).parent().attr('name');
    var type = name.split(' ').slice(-1).join(' ');
    var route = '';
    if(type=="TeamLeader"){
      route = "change_tag_teamLeader";
    }else if(type=="Team"){
      route = "change_tag_team";
    }else if(type=="CampusAmbassador"){
      route = "change_tag_ca";
    }
       $.ajax({
      url: '/admin/'+route,
      type: 'POST',
      data: {id: name.split(' ').slice(0, -1).join(' ') , color: "#006400"},
      success: function(data){
      },
      error: function(err){
      }
    });
});

$('.circle-red').on('click',function(){
    $(this).parent().css("background","#8B0000");
    var name = $(this).parent().attr('name');
    var type = name.split(' ').slice(-1).join(' ');
    var route = '';
    if(type=="TeamLeader"){
      route = "change_tag_teamLeader";
    }else if(type=="Team"){
      route = "change_tag_team";
    }else if(type=="CampusAmbassador"){
      route = "change_tag_ca";
    }
       $.ajax({
      url: '/admin/'+route,
      type: 'POST',
      data: {id: name.split(' ').slice(0, -1).join(' ') , color: "#8B0000"},
      success: function(data){
      },
      error: function(err){
      }
    });
});

  

$('#sort').on('change',function(){
    var option = $(this).val();
    if(option=="all"){
      $(".grey").show();
      $(".006400").show();
      $(".8B0000").show();
    }else if(option=="#006400"){
      $(".006400").show();
      $(".grey").hide();
      $(".8B0000").hide();
    }else if(option=="#8B0000"){
      $(".8B0000").show();
      $(".grey").hide();
      $(".006400").hide();
    }else if(option=="grey"){
      $(".grey").show();
      $(".8B0000").hide();
      $(".006400").hide();
    }

});

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

 // var i=0;
 //  var spread=0;
 //  var stop=setInterval(()=> {

 //    //if i<1k inc spread by 1
 //    if(i<100) {
 //      // console.log('+');
     

 //      spread+=1;
 //    }
 //    if(i>100) {
 //      spread-=1; 
 //      // console.log('-');
 //    }
 //    if(i===200) {
 //      i=0;
 //      // console.log('reset');
 //      spread=0;
 //    }
 //    //if i>1k dec spread by 1
 //    //if i===2k set spread and i to 0


 //    document.getElementById("box").style["boxShadow"] = "1px 1px "+spread+"px white";     

 //    i++;

 //    // console.log(i);

 //  },10);


  var lines=anime({
    targets:'.line',
    translateY: 45,
    direction: 'alternate',
    // easing: 'linear',
    elasticity:600,
    loop:true,
    // easing: 'easeInQuad',
    // round:5,
    // rotate: function() { return anime.random(-360, 360); },
    duration: function(el, i, l) {
      return 2500 + (i * 800);
    }
  });

});


// end of document.onready 

AOS.init({
  duration: 1200,
});


/* ---- stats.js config ---- */

// var count_particles, stats, update;
// stats = new Stats;
// stats.setMode(0);
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.left = '0px';
// stats.domElement.style.top = '0px';
// document.body.appendChild(stats.domElement);
// count_particles = document.querySelector('.js-count-particles');
// update = function() {
//   stats.begin();
//   stats.end();
//   if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
//     count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
//   }
//   requestAnimationFrame(update);
// };
// requestAnimationFrame(update);






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

