
// Slider
$(document).ready(function() {
    AOS.init({
        offset: 200,
        duration: 1200,
    });
    mainSlider();
    scrollFunction();

})



function mainSlider() {
    var BasicSlider = $(".jkl-slider");
    BasicSlider.on("init", function(e, slick) {
        var $firstAnimatingElements = $(".jkl-slider-container:first-child").find(
            "[data-animation]"
        );
        doAnimations($firstAnimatingElements);
    });
    BasicSlider.on("beforeChange", function(e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
            '.slick-slide[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
    });
    BasicSlider.slick({
        autoplay: true,
        autoplaySpeed: 10000,
        fade: true,
        prevArrow:
            '<button type="button" class="slick-prev"><i class="icofont-long-arrow-left"></i>Prev</button>',
        nextArrow:
            '<button type="button" class="slick-next"><i class="icofont-long-arrow-right"></i>Next</button>',
        arrows: false,
        dots: true,
        responsive: [
            { breakpoint: 767, settings: { dots: false, arrows: false } }
        ]
    });

    function doAnimations(elements) {
        var animationEndEvents =
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data("delay");
            var $animationType = "animated " + $this.data("animation");
            $this.css({
                "animation-delay": $animationDelay,
                "-webkit-animation-delay": $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
    }
}



// Logo Scroll Effect
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if ($(".jkl-menu").css("position") != "fixed") {
        return
    }
    let isScrollUp = this.oldScroll > this.scrollY;
    this.oldScroll = this.scrollY;
    let currentHeight = $("#menu-logo").height();
    let finalHeight = 70;

    let movePx = 200;
    if (!this.headerLogoHeight) {
        this.headerLogoHeight = currentHeight
    }
    let heightDiff = this.headerLogoHeight - finalHeight
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    if (scrollTop == 0) {
        $("#menu-logo").height(this.headerLogoHeight)
        $("#menu-logo").width(this.headerLogoHeight)
        $(".jkl-menu").css("background-color", "#00000000")
        return
    }
    if (isScrollUp) {
        if (currentHeight === this.headerLogoHeight || scrollTop > movePx) {
            return
        }
        $(".jkl-menu").css("background-color", "#00000000")
        let expHeight = this.headerLogoHeight - heightDiff * scrollTop / movePx
        if (expHeight >= finalHeight) {
            $("#menu-logo").height(expHeight)
            $("#menu-logo").width(expHeight)
        } else {
            $("#menu-logo").height(finalHeight)
            $("#menu-logo").width(finalHeight)
            $(".jkl-menu").css("background-color", "#00000000")
        }
    } else {
        if (currentHeight <= finalHeight) {
            $(".jkl-menu").css("background-color", "#000000BC");
            return
        }
            let expHeight = this.headerLogoHeight - heightDiff * scrollTop / movePx
            if (expHeight >= finalHeight) {
                $("#menu-logo").height(expHeight)
                $("#menu-logo").width(expHeight)
            } else {
                $("#menu-logo").height(finalHeight)
                $("#menu-logo").width(finalHeight)
                $(".jkl-menu").css("background-color", "#000000BC")
            }


        }
}