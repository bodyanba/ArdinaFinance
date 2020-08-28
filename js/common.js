$(document).ready(function () {

  $("body").fadeIn(500);
	$("a[href$='.html']").on("click", function(e){
		e.preventDefault();
		linkLocation = this.href;
		$("body").fadeOut(500, redirectPage);
	});

	function redirectPage() {
		window.location = linkLocation;
	}

  $(".owl").owlCarousel({
    items: 1,
    autoplay: true,
    autoplayTimeout: 15000,
    autoHeight: true,
    smartSpeed: 1000,
    loop: true,
    margin: 50
  });

  $("#sandwich").on("click", function() {
    $(this).toggleClass("active");
    $("body").toggleClass("menubar-in");
  });

	AOS.init({
		easing: 'ease-out-back',
		duration: 1000,
    disable: 'mobile'
	});

  if (window.matchMedia('(max-width: 767px)').matches)
		Waves.attach('#sandwich', ['waves-light']);
	Waves.init();

	var bg = $(".section-hero .bg");
  if (bg) {
    $(window).on("scroll", function() { 
      bg.css('margin-top', ($(window).scrollTop())/3);
      bg.css('opacity', 1 - ($(window).scrollTop())/bg.height());
    });
  };

  $("#scroll-bottom").on("click", function() {
    $('html, body').animate({
      scrollTop: $("#section-2").offset().top
    }, 700);
	});

  $('#scroll-top').on("click", function () {
    $('body, html').animate({
      scrollTop: 0
    }, 700);
  });

  $(window).on("scroll", function () {
  	var wind = $(this).scrollTop();
  	var header = $(".page-header");
  	var s2 = $("#section-2").offset().top;
    var s3 = $("#section-3").offset().top;
    var s4 = 1000000;
    if ($("#section-4").length == 1) {
      var s4 = $("#section-4").offset().top;
    };
    if (s2 < wind && wind < s3) {
    	header.removeClass("black black-2");
    	header.addClass("white");
    } else if (s3 < wind && wind < s4) {
      header.removeClass("white white-2");
      header.addClass("black");
      if ($("#section-3").hasClass("section-about-3")) {
        header.addClass("black-2")
      }
    } else if (s4 < wind) {
      header.removeClass("black black-2");
      header.addClass("white white-2");
    } else {
    	header.removeClass("white white-2 black black-2");
    };
  });

  // BACKGROUND VIDEO
  function homeVid() {
    var vid = document.getElementById('videos-src');
    
    if (vid) {
      $('body').addClass('fade-video-out');

      // cree tableau
      var videoSrc = $('.videos-src').data('src');
      var playlist = videoSrc.split(', ');

      var i = 0;

      vid = document.getElementById('bgvidHome');
      var source = document.createElement('source');
      vid.appendChild(source);
      source.setAttribute('type', 'video/mp4');
      source.setAttribute('src', playlist[i]);
      vid.play();

      vid2 = document.getElementById('bgvidHome-2');
      var source2 = document.createElement('source');
      vid2.appendChild(source2);
      source2.setAttribute('type', 'video/mp4');
      source2.setAttribute('src', playlist[i + 1]);

      $('body').removeClass('fade-video-out').addClass('fade-video-in');

      // fade fin de video
      var u = true;
      $('#bgvidHome').on('timeupdate', function(event) {

        var timeFromVideoEnd = 2;
        var current = Math.round(event.target.currentTime);
        var total = Math.round(event.target.duration /* * 1000 */ );
        var calc = total - current;

        if ((calc < timeFromVideoEnd) && u == true) {

          u = false;

          $(this).addClass('fade-out');

          i++;
          if (i == playlist.length) {
            i = 0;
          }
          
          source2.setAttribute('src', playlist[i]);
          vid2.load();
          vid2.play();
          
          console.log('player 1 ending! next show player 2 with ' + playlist[i] + ' #'+(i+1))

          setTimeout(function() {
            $(this).addClass('zindex');
          }, 1000);
          setTimeout(function() {
            $('#bgvidHome-2').removeClass('fade-out');
          }, 500);

        }
      }).on('ended', function() {
        u = true;
      });

      var u2 = true;
      $('#bgvidHome-2').on('timeupdate', function(event) {
        
        var timeFromVideoEnd = 2;
        var current = Math.round(event.target.currentTime);
        var total = Math.round(event.target.duration /* * 1000 */ );
        var calc = total - current;

        if ((calc < timeFromVideoEnd) && u2 == true) {

          u2 = false;

          $(this).addClass('fade-out');

          i++;
          if (i == playlist.length) {
            i = 0;
          }
          
          source.setAttribute('src', playlist[i]);
          vid.load();
          vid.play();
        
          console.log('player 2 ending! next show player 1 with' + playlist[i] + ' #'+(i+1))

          setTimeout(function() {
            $(this).addClass('zindex');
          }, 1000);
          setTimeout(function() {
            $('#bgvidHome').removeClass('fade-out');
          }, 500);
        }
      }).on('ended', function() {
        u2 = true;
      });

    }
  }
  homeVid();
  // END BACKGROUND VIDEO

});