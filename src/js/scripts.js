import $ from 'jquery';
// import "jquery-mask-plugin";
import { Accordion } from 'bootstrap/dist/js/bootstrap.min'
import { Fancybox } from "../../node_modules/@fancyapps/ui/src/Fancybox/Fancybox";
import Swiper, { Navigation, Pagination } from 'swiper';
import Masonry from 'masonry-layout';
import * as ScrollMagic from "scrollmagic";
import { TweenMax, TimelineMax, gsap} from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from './ScrollSmoother.min';



// Global jQuery letiables
global.jQuery = $;
global.$ = $;

$(document).ready(()=>{


  // Masonry init ---------------------------------------------
  const elem = document.querySelector('.blog-items');
  if(elem) {
    setTimeout(function () {
      const msnry = new Masonry( elem, {
        itemSelector: '.blog-item',
        percentPosition: true,
      });
      ScrollTrigger.refresh()
    },200)
  }

  // animate menu ---------------------------------------------
  const ham = document.querySelector(".toggle-menu");
  const menu = document.querySelector('.header_menu');
  const links = menu.querySelectorAll('li');
  const lang = menu.querySelector('.header-lang-mobile');
  const social = menu.querySelector('.header .social');

  var tl = gsap.timeline({ paused: true });

  tl.to(menu, {
    duration: 0.5,
    opacity: 1,
    y: 0,
    autoAlpha: 1,
    ease: 'expo.inOut',
  })

  tl.from(links, {
    duration: 1,
    opacity: 0,
    y: 30,
    stagger: 0.1,
    ease: 'expo.inOut',
  }, "-=0.5");

  tl.from(lang, {
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'expo.inOut',
  }, "-=0.5");

  tl.from(social, {
    duration: 0.8,
    opacity: 0,
    y: 30,
    ease: 'expo.inOut',
  }, "-=0.5");

  tl.reverse();

  ham.addEventListener('click', () => {
    tl.reversed(!tl.reversed());
  });


  //resize textarea--------------------------------------------
  const textarea = $('textarea');
  textarea.each(function () {
    this.setAttribute('style', 'height:37px;overflow-y:hidden;');
  }).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });


  //input-site--------------------------------------------------
  $('.input-site').on('focus', function () {
    const parentInput = $(this).parents('.input-wrap')
    parentInput.addClass('active')
  })

  $('.input-site').on('blur', function () {
    const parentInput = $(this).parents('.input-wrap')
    if($(this).val() === '') {
      parentInput.removeClass('active')
    }
  })


  //cookies------------------------------------------------------
  $('.close-cookies').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.cookies').removeClass('cookies-visible')
  })


  $('button[data-bs-toggle="pill"]').on('shown.bs.tab', event  => {
    setTimeout(function () {
      ScrollTrigger.refresh()
    },500)
  })

  //ScrollSmoother-----------------------------------------------
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

  //Animate img on scroll---------------------------------------------
  ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function() {

      // scroll to anchor-------------------------------------------------------
      function getSamePageAnchor (link) {
        if (
          link.protocol !== window.location.protocol ||
          link.host !== window.location.host ||
          link.pathname !== window.location.pathname ||
          link.search !== window.location.search
        ) {
          return false;
        }
        return link.hash;
      }

      function scrollToHash(hash, e) {
        const elem = hash ? document.querySelector(hash) : false;
        if(elem) {
          if(e) e.preventDefault();
          gsap.to(window, {scrollTo: elem});
        }
      }

      document.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('click', e => {
          scrollToHash(getSamePageAnchor(a), e);
        });
      });
      scrollToHash(window.location.hash);


      //ScrollSmoother------------------------------------------------------------
      const smoother = ScrollSmoother.create({
        wrapper: '#wrapper',
        content: '#content',
        effects: true,
        smooth: 1.8,
        smoothTouch: 0.1,
      })


      //animate img---------------------------------------------------------------
      let controller = new ScrollMagic.Controller();
      const imgAnimateBox = $('.imgWrap')
      imgAnimateBox.each(function () {
        const tween = TweenMax.to($(this).find('img'), 1, {scale: 1.1, yoyo: true});
        const scene = new ScrollMagic.Scene({triggerElement: this, duration: "100%"})
          .setTween(tween)
          .addTo(controller);
      })
    },
  });


  //init facilitiesHighlight-slider----------------------------
  const facilitiesHighlightSlider = new Swiper(".facilitiesHighlight-slider", {
    modules: [Navigation, Pagination],
    slidesPerView: 2,
    spaceBetween: 20,
    centeredSlides: true,
    simulateTouch: false,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          ' — ' +
          '<span class="' + totalClass + '"></span>';
      }
    },
    navigation: {
      nextEl: '.facilitiesHighlight-next',
      prevEl: '.facilitiesHighlight-prev',
    },
    on: {
      init: function () {
        ScrollTrigger.refresh()
      },
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 3,
      },
      767: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
    },
  });


  //header-fixed ----------------------------------------------
  let header = $('.header-fixed');
  let scrolled = $(window).scrollTop();
  function headerFixed() {
    let scrollPrev = 0;
    $(window).scroll(function() {
      let scrolled = $(window).scrollTop();
      if(scrolled < 120) {
        header.addClass('static')
      }
      if ( scrolled > 0 && scrolled > scrollPrev ) {
        header.removeClass('in');
        header.removeClass('static')
      } else if(scrolled < 15) {
        header.removeClass('in');
      }
      else{
        header.addClass('in');
      }
      scrollPrev = scrolled;
    });
  }
  headerFixed()

  if(scrolled > 0) {
    header.addClass('in');
  }

  // toggleMenu ------------------------------------------------
  $('.toggle-menu').on('click', function () {
    $(this).toggleClass('active')
    $('body').toggleClass('hidden')
    $('.header_menu').toggleClass('active')
    $('.header').toggleClass('active')
  })

  // select init -----------------------------------------------
  $('.select').customSelect();

});