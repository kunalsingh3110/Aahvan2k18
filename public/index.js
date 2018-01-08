$(document).ready(function(){

// var images=Array.from(document.querySelectorAll('.img-elem'));

// images.forEach((img)=> {
//   $(img).on('click',()=>{
//     console.log('add');
//     document.querySelector('.cancel-btn-container').classList.add('overlay');
//     document.querySelector('.cancel-btn').classList.add('btndis');
//     img.classList.add('overlay');
//     img.classList.add('remOpacity');
//     img.children[0].classList.add('imgPos');
//     img.children[0].style.width="50%";
//       $('.cancel-btn').on('click',()=> {
//         console.log('remove');
//         document.querySelector('.cancel-btn-container').classList.remove('overlay');
//         document.querySelector('.cancel-btn').classList.remove('btndis');
//         img.classList.remove('overlay');
//         img.classList.remove('remOpacity');
//         img.children[0].classList.remove('imgPos');
//         img.children[0].style.width="100%";
//       });
//   });
// });



$('#Events').on("click",function() {
<<<<<<< HEAD
  jQuery("html, body").animate({scrollTop:  $("#particles-js").offset().top }, 2000);   
});

$('#Theme').on("click",function() {
  jQuery("html, body").animate({scrollTop:  $(".theme").offset().top }, 2000);   
});

$('#Lookback').on("click",function() {
  jQuery("html, body").animate({scrollTop:  $(".lookback").offset().top }, 2000);   
=======
  jQuery("#home").animate({scrollTop:  $(".events").offset().top }, 1000);   
});

$('#Theme').on("click",function() {
  jQuery("#home").animate({scrollTop:  $(".theme").offset().top }, 2000);   
});

$('#CA').on("click",function() {
  jQuery("#home").animate({scrollTop:  $("#campus").offset().top }, 2000);   
});

$('#Lookback').on("click",function() {
  jQuery("#home").animate({scrollTop:  $(".lookback-text").offset().top }, 2000);   
>>>>>>> 7938e686afd1d9549804afaa301819b72aa39c70
});

$('#Live').on("click",function() {
  jQuery("html, body").animate({scrollTop:  $(".live").offset().top }, 2000);   
});


  // window.onscroll = () => {
  //   const nav = document.querySelector('.navbar');
  //   // console.log(document.body.scrollTop);
  //   // console.log(this.scrollY);
  //   if(document.body.scrollTop >= 100) nav.classList.add('scroll');
  //   else nav.classList.remove('scroll');
  // };


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

<<<<<<< HEAD
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 150,
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
        "nb_sides": 10
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
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
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
=======
// particlesJS("particles-js", {
//   "particles": {
//     "number": {
//       "value": 50,
//       "density": {
//         "enable": true,
//         "value_area": 800
//       }
//     },
//     "color": {
//       "value": "#ffffff"
//     },
//     "shape": {
//       "type": "circle",
//       "stroke": {
//         "width": 0,
//         "color": "#000000"
//       },
//       "polygon": {
//         "nb_sides": 5
//       },
//       "image": {
//         "src": "img/github.svg",
//         "width": 100,
//         "height": 100
//       }
//     },
//     "opacity": {
//       "value": 0.5,
//       "random": false,
//       "anim": {
//         "enable": false,
//         "speed": 1,
//         "opacity_min": 0.1,
//         "sync": false
//       }
//     },
//     "size": {
//       "value": 3,
//       "random": true,
//       "anim": {
//         "enable": false,
//         "speed": 40,
//         "size_min": 0.1,
//         "sync": false
//       }
//     },
//     "line_linked": {
//       "enable": true,
//       "distance": 150,
//       "color": "#ffffff",
//       "opacity": 0.4,
//       "width": 1
//     },
//     "move": {
//       "enable": true,
//       "speed": 6,
//       "direction": "none",
//       "random": false,
//       "straight": false,
//       "out_mode": "out",
//       "bounce": false,
//       "attract": {
//         "enable": false,
//         "rotateX": 600,
//         "rotateY": 1200
//       }
//     }
//   },
//   "interactivity": {
//     "detect_on": "canvas",
//     "events": {
//       "onhover": {
//         "enable": true,
//         "mode": "grab"
//       },
//       "onclick": {
//         "enable": true,
//         "mode": "push"
//       },
//       "resize": true
//     },
//     "modes": {
//       "grab": {
//         "distance": 140,
//         "line_linked": {
//           "opacity": 1
//         }
//       },
//       "bubble": {
//         "distance": 400,
//         "size": 40,
//         "duration": 2,
//         "opacity": 8,
//         "speed": 3
//       },
//       "repulse": {
//         "distance": 200,
//         "duration": 0.4
//       },
//       "push": {
//         "particles_nb": 4
//       },
//       "remove": {
//         "particles_nb": 2
//       }
//     }
//   },
//   "retina_detect": true
// });
>>>>>>> 7938e686afd1d9549804afaa301819b72aa39c70

particlesJS("particles-js-two",{
  "particles": {
    "number": {
      "value": 6,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#1b1e34"
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#000"
      },
      "polygon": {
        "nb_sides": 6
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 160,
      "random": false,
      "anim": {
        "enable": true,
        "speed": 10,
        "size_min": 40,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 200,
      "color": "#ffffff",
      "opacity": 1,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 8,
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
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
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



AOS.init({
  duration: 600,
});

});

