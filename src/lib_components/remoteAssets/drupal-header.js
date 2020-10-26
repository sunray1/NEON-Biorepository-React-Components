require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({3:[function(require,module,exports){
"use strict";

(function ($) {
  $(document).ready(function () {
    try {
      onReady();
    } catch (error) {
      console.log(error);
    }
  });

  function onReady() {
    // All screens
    var $header = $(".header");
    var mainNavHeight = $header.outerHeight() || 0;
    var mainNavOffset = $header.parent().offset();
    $header.parent().css("padding-top", mainNavHeight + "px");
    $header.css("top", mainNavOffset.top + "px");

    // Throlle Function
    function throttle(fn, wait) {
      var isThrottled = false,
          lastArgs = null;
      return function wrapper() {
        var _this = this;

        if (isThrottled) {
          lastArgs = arguments;
        } else {
          fn.apply(this, arguments);
          isThrottled = setTimeout(function () {
            isThrottled = false;
            if (lastArgs) {
              wrapper.apply(_this, lastArgs);
              lastArgs = null;
            }
          }, wait);
        }
      };
    }

    $(window).resize(function () {
      onResize();
    });

    var setMegaMenuFrameSize = function setMegaMenuFrameSize() {
      // select the Scroll frame
      $(".subNavWrapper").each(function () {
        var scollFrame = $(this).closest("");
      });
      // go throught the header and find all of the ULs
    };

    var onResize = throttle(function () {
      // All screens
      var $header = $(".header");
      var mainNavHeight = $header.outerHeight() || 0;
      var mainNavOffset = $header.parent().offset();

      $header.parent().css("padding-top", mainNavHeight + "px");
      $header.css("top", mainNavOffset.top + "px");

      if ($(".sticky").length) {
        $(".sticky").css("top", mainNavHeight + mainNavOffset.top + 15 + "px");
      }

      // Desktop
      if ($(window).width() > 1200) {
        var megaMenuOffset = mainNavHeight + mainNavOffset.top + "px";
        $(".subNavWrapper").each(function () {

          $(this).css({
            height: "calc(100vh - " + megaMenuOffset + ")",
            top: megaMenuOffset
          });

          $(this).find(".innerSubNavWrapper").css({
            height: "calc(100vh - " + megaMenuOffset + ")"
          });
        });

        // Mobile
      } else {
        $(".subNavWrapper").removeAttr("style");
        $(".innerSubNavWrapper").removeAttr("style");
      }
    });

    onResize();

    //  Mobile Nav trigger
    $(".js-mobile-nav-trigger").on("change", function (e) {
      $("body")[e.target.checked ? "addClass" : "removeClass"]("js-prevent-scroll");
      console.log("mobile trigger");
      $(".subNavWrapper").each(function (e) {
        $(this).removeClass("depthZero depthOne depthTwo depthThree depthFour").addClass("subNavWrapper");
      });
      $("nav#block-neon-main-menu ul[data-depth='0'] > li.menu__item--expanded").each(function (e) {
        $(this).removeClass("over");
      });
    });

    // $("nav#block-neon-main-menu ul.menu--main li.menu__item--expanded > ul").wrap(
    //   "<div class='subNavWrapper'><div class='innerSubNavWrapper'></div></div>"
    // );

    $("nav#block-neon-main-menu > ul.menu--main > li.menu__item--expanded").each(function (e) {
      var topLevelNavLabel = $(this).children("a").text();
    });

    $(".subNavWrapper").mouseover(function (e) {
      e.stopPropagation();
      $(".menu__item.menu__item--expanded.over > .arrow").addClass("hiddenDesktop");
    });
    $(".subNavWrapper").mouseout(function (e) {
      e.stopPropagation();
      $(".menu__item.menu__item--expanded.over > .arrow").removeClass("hiddenDesktop");
    });
    $(".subNavWrapper").focusin(function (e) {
      e.stopPropagation();
      $(".menu__item.menu__item--expanded.over > .arrow").addClass("hiddenDesktop");
    });

    $("nav#block-neon-main-menu > ul.menu--main > li > a").focus(function (e) {
      e.stopPropagation();
      $("nav#block-neon-main-menu ul.menu--main > li").each(function (e) {
        $(this).removeClass("over");
      });
      $("nav#block-neon-main-menu ul.menu--main > li .arrow").each(function (e) {
        $(this).removeClass("hiddenDesktop");
      });
    });

    // ===== Main Nav click ====
    $("nav#block-neon-main-menu ul.menu--main li.menu__item.menu__item--expanded .arrow").click(function (e) {
      e.stopPropagation();
      var thisListParent = $(this).parent().closest("li.menu__item.menu__item--expanded");
      $("nav#block-neon-main-menu ul.menu--main li.menu__item.menu__item--expanded").not(thisListParent).each(function (e) {
        $(this).removeClass("over");
        $(thisListParent).children(".subNavWrapper").removeClass("depthZero");
      });
      thisListParent.toggleClass("over");
      $(thisListParent).children(".subNavWrapper").addClass("depthZero");
    });

    $("nav#block-neon-main-menu ul.menu--main li.menu__item.menu__item--expanded .subNavClose").click(function (e) {
      e.stopPropagation();
      var $thisListParent = $(this).parent().parent().closest("li.menu__item.menu__item--expanded");
      var $thisListButton = $thisListParent.find("button.arrow");
      $thisListParent.removeClass("over");
      $thisListButton.removeClass("hiddenDesktop");
    });

    // ===== Mobile Back Button ====
    $("nav#block-neon-main-menu ul.menu--main li.menu__item.menu__item--expanded .mobileBack").click(function (e) {
      e.stopPropagation();
      console.log("mobile back");

      var thisParent = $(this).parent().closest(".subNavWrapper");
      var depthFour = $(thisParent).hasClass("depthFour").toString();
      var depthThree = $(thisParent).hasClass("depthThree").toString();
      var depthTwo = $(thisParent).hasClass("depthTwo").toString();
      var depthOne = $(thisParent).hasClass("depthOne").toString();
      var depthZero = $(thisParent).hasClass("depthZero").toString();

      if (depthFour === "true") {
        thisParent.removeClass("depthFour");
        $(thisParent).find("ul[data-depth='4'] > li.expandable").removeClass("active");
      } else if (depthThree === "true") {
        thisParent.removeClass("depthThree");
        $(thisParent).find("ul[data-depth='3'] > li.expandable").removeClass("active");
      } else if (depthTwo === "true") {
        thisParent.removeClass("depthTwo");
        $(thisParent).find("ul[data-depth='2'] > li.expandable").removeClass("active");
      } else if (depthOne === "true") {
        thisParent.removeClass("depthOne");
        $(thisParent).find("ul[data-depth='1'] > li.expandable").removeClass("active");
      } else if (depthZero === "true") {
        thisParent.removeClass("depthZero");
        $("ul[data-depth='0'] > li.menu__item--expanded").removeClass("over");
        $(thisParent).find("ul[data-depth='0'] > li.expandable").removeClass("active");
        $("nav#block-neon-main-menu ul[data-depth='0'] > li.menu__item--expanded .subNavWrapper").each(function (e) {
          $(this).removeClass("depthZero depthOne depthTwo depthThree depthFour").addClass("subNavWrapper");
        });
      } else {}
    });

    // Press esc key to close the mega menu
    $(document).keyup(function (e) {
      e.stopPropagation();
      if (e.which === 27) {
        $(".subNavClose").click();
        $(".header__search-close button").click();
      }
    });

    // Add a class to all of the lists that have sub lists
    $("nav#block-neon-main-menu ul.menu--main li.menu__item--expanded ul li").each(function (e) {
      if ($(this).children("ul").length) {
        $(this).addClass("expandable");
      }
    });

    $("nav#block-neon-main-menu ul.menu--main ul[data-depth='1'] > li.expandable").each(function (e) {
      $(this).children("a").after("<button class='mini-arrow focusable' tabindex='0' aria-label='Toggle Mega Menu'><svg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 1L5 5L1 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></button>");
    });

    $("nav#block-neon-main-menu ul.menu--main ul[data-depth='2'] > li.expandable").each(function (e) {
      $(this).children("a").after("<button class='mini-arrow focusable isMobile' tabindex='0' aria-label='Toggle Mega Menu'><svg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 1L5 5L1 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></button>");
    });

    $("nav#block-neon-main-menu ul.menu--main ul[data-depth='3'] > li.expandable").each(function (e) {
      $(this).children("a").after("<button class='mini-arrow focusable' tabindex='0' aria-label='Toggle Mega Menu'><svg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 1L5 5L1 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></button>");
    });

    $("nav#block-neon-main-menu ul.menu--main ul[data-depth='4'] > li.expandable").each(function (e) {
      $(this).children("a").after("<button class='mini-arrow focusable isMobile' tabindex='0' aria-label='Toggle Mega Menu'><svg width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1 1L5 5L1 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></button>");
    });

    // On menu click add the class status to the wrapper
    $('nav#block-neon-main-menu ul.menu--main[data-depth="1"] > li.expandable').click(function (e) {
      e.stopPropagation();
      // check if item is active
      var $active = $(this).hasClass("active").toString();
      console.log("level one " + $active);
      var $MegaMenu3rdCol = $(".subNavWrapper").hasClass("depthOne").toString();
      var $MegaMenu4thCol = $(".subNavWrapper").hasClass("depthThree").toString();
      if ($active === "true") {
        console.log("active");
        $(this).parent().closest(".subNavWrapper").removeClass("depthOne");
        $(this).parent().closest(".subNavWrapper").removeClass("depthThree");
        $(this).children().find("li.active").removeClass("active");

        // $(this).parent().parent().children().find('li.active').removeClass("active");
        $(this).addClass("active").siblings("li").removeClass("active");
      } else {
        $(this).siblings("li").find("li.active").removeClass("active");

        if ($MegaMenu3rdCol === "true" && $MegaMenu4thCol === "true") {
          console.log("not active 1");
          $(this).parent().closest(".subNavWrapper").toggleClass("depthThree");
        } else if ($MegaMenu3rdCol === "true") {
          console.log("not active 2");
        } else {
          console.log("not active 3");
          $(this).parent().closest(".subNavWrapper").toggleClass("depthOne");
        }
      }
    });

    $('nav#block-neon-main-menu ul.menu--main[data-depth="2"] > li.expandable').click(function (e) {
      e.stopPropagation();
      console.log("level two");
      $(this).parent().closest(".subNavWrapper").toggleClass("depthTwo");
      $(this).parent().closest(".subNavWrapper").toggleClass("depthThree");
    });

    $('nav#block-neon-main-menu ul.menu--main[data-depth="3"] > li.expandable').click(function (e) {
      e.stopPropagation();
      //$(this).parents("ul[data-depth='2']").children("li").removeClass("active");
      // $(this).addClass("active");

      var $MegaMenu4thCol = $(".subNavWrapper").hasClass("depthThree").toString();
      if ($MegaMenu4thCol !== "true") {
        $(this).parent().closest(".subNavWrapper").toggleClass("depthThree");
      }
    });

    $('nav#block-neon-main-menu ul.menu--main[data-depth="4"] > li.expandable').click(function (e) {
      e.stopPropagation();
      console.log("level four");
      //
      $(this).parent().closest(".subNavWrapper").toggleClass("depthFour");
    });

    // Add a class to the sub items that expand more sub lists - FOR the first level
    $("nav#block-neon-main-menu ul.menu--main[data-depth='1'] > li.expandable").click(function (e) {
      e.stopPropagation();
      //$(this).toggleClass("active").parents("ul").children("li").removeClass("active");
      $(this).toggleClass("active").siblings("li").removeClass("active");
      console.log("remove active - Level One");
    });

    // Add a class to the sub items that expand more sub lists - FOR the third level
    $("nav#block-neon-main-menu ul.menu--main[data-depth='3'] > li.expandable").click(function (e) {
      e.stopPropagation();

      if ($(this).hasClass("active").toString() === "true") {
        console.log("true");
        $(this).removeClass("active");
      } else {
        console.log("false");
        $("ul[data-depth='3']").children("li").removeClass("active");
        $(this).addClass("active").siblings("li").removeClass("active");
      }
      console.log("remove active - Level Three");
    });

    // Hide/show Desktop Search
    $("li.siteSearch a.menu__link").click(function (e) {
      e.stopPropagation();
      $(".header__search").toggleClass("visually-hidden");
      return false;
    });

    $(".header__search-close button").click(function (e) {
      e.stopPropagation();
      console.log("close mega menu");
      if ($(".header__search").hasClass("visually-hidden")) {
        return false;
      } else {
        $(".header__search").addClass("visually-hidden");
      }
    });

    $("#search-block-form label").removeClass("visually-hidden");
  }
})(jQuery);

},{}]},{},[3]);