---
---
$(document).ready(function() {
	"use strict";

    // 1. Scroll To Top

    $(window).on('scroll',function () {
        if ($(this).scrollTop() > 600) {
            $('.return-to-top').fadeIn();
        } else {
            $('.return-to-top').fadeOut();
        }
    });

    $('.return-to-top').on('click',function() {
            $('html, body').animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    // 2. Smooth Scroll spy

    $('.header-area').sticky({
       topSpacing:0
    });

    //=============

    $('li.smooth-menu a').bind("click", function(event) {
        event.preventDefault();
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 0
        }, 1200,'easeInOutExpo');
    });

    $('body').scrollspy({
        target:'.navbar-collapse',
        offset:0
    });

    // 3. Progress-bar

    var dataToggleTooTip = $('[data-toggle="tooltip"]');
    var progressBar = $(".progress-bar");
    if (progressBar.length) {
        progressBar.appear(function () {
            dataToggleTooTip.tooltip({
                trigger: 'manual'
            }).tooltip('show');
            progressBar.each(function () {
                var each_bar_width = $(this).attr('aria-valuenow');
                $(this).width(each_bar_width + '%');
            });
        });
    }

    // 4. owl carousel

    $('#projects-carousel').owlCarousel({
        items:{% if site.data.projects.size < 7 %}{{ site.data.projects.size }}{% else %}7{% endif %},
        loop:true,
        smartSpeed: 1000,
        autoplay:true,
        dots:false,
        autoplayHoverPause:true,
        responsive: {
            0:{
                items:{% if site.data.projects.size < 2 %}{{ site.data.projects.size }}{% else %}2{% endif %}
            },
            415:{
                items:{% if site.data.projects.size < 2 %}{{ site.data.projects.size }}{% else %}2{% endif %}
            },
            600:{
                items:{% if site.data.projects.size < 4 %}{{ site.data.projects.size }}{% else %}4{% endif %}

            },
            1199:{
                items:{% if site.data.projects.size < 4 %}{{ site.data.projects.size }}{% else %}4{% endif %}
            },
            1200:{
                items:{% if site.data.projects.size < 7 %}{{ site.data.projects.size }}{% else %}7{% endif %}
            }
        }
    });

    $('.play').on('click',function() {
        owl.trigger('play.owl.autoplay',[1000])
    })

    $('.stop').on('click',function() {
        owl.trigger('stop.owl.autoplay')
    })

    // 5. welcome animation support

    $(window).load(function() {
        $(".header-text h2,.header-text p").removeClass("animated fadeInUp").css({'opacity':'0'});
        $(".header-text a").removeClass("animated fadeInDown").css({'opacity':'0'});
    });

    $(window).load(function() {
        $(".header-text h2,.header-text p").addClass("animated fadeInUp").css({'opacity':'0'});
        $(".header-text a").addClass("animated fadeInDown").css({'opacity':'0'});
    });
});	
