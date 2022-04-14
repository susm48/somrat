(function ($) {
	'use strict';
	/*--------------------------------
	 Start Smooth Scrolling
	----------------------------------*/
	function smoothScroll() {
		// Select all links with hashes
		$('a[href*="#"]')
			// Remove links that don't actually link to anything
			.not('[href="#"]')
			.not('[href="#0"]')
			.on("click", function (event) {
				// On-page links
				if (
					location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
					location.hostname == this.hostname
				) {
					// Figure out element to scroll to
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					// Does a scroll target exist?
					if (target.length) {
						// Only prevent default if animation is actually gonna happen
						event.preventDefault();
						$('html, body').animate({
							scrollTop: target.offset().top
						}, 1000, "easeInOutExpo", function () {
							// Callback after animation
							// Must change focus!
							var $target = $(target);
							$target.focus();
							if ($target.is(":focus")) { // Checking if the target was focused
								return false;
							} else {
								$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
								$target.focus(); // Set focus again
							}
						});
					}
				}
			});
		jQuery.extend(jQuery.easing, {
			easeInOutExpo: function (x, t, b, c, d) {
				if (t == 0) return b;
				if (t == d) return b + c;
				if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
				return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
			}
		});
	}
	// Applying Smooth Scroll When The Browser Is Not Opera Mini Or UC Browser
	if (navigator.userAgent.indexOf('Opera Mini') == -1 || navigator.userAgent.indexOf('UCBrowser') != -1) {
		smoothScroll();
	}
	/*--------------------------------
			End Smooth Scrolling
	----------------------------------*/

	/*--------------------------------
	Start Menu
		----------------------------------*/
	// Highlighting Menu on Scroll Through Sections
	$(window).on('scroll', function () {
		$('section').each(function () {
			if ($(window).scrollTop() + 50 >= $(this).offset().top) {
				var id = $(this).attr('id');
				$('.menu-item').removeClass('active');
				$(".menu-item." + id).addClass("active");
				$(".mobile-menu-item").removeClass("active");
				$(".mobile-menu-item." + id).addClass("active");
			}
		});
	});

	// Styling Menu on Scroll
	$('.about-me').waypoint({
		handler: function (direction) {
			// Fixing Menu after leaving Header Section
			$(".menu").toggleClass("menu-fix");
			// Changing Menu background after leaving Header Section
			$(".menu-container").toggleClass("menu-normal");
			$(".menu-item").toggleClass("menu-item-transparent");
			$(".desktop-menu .hvr-underline-from-left").toggleClass("dark");
			// Toggling Mobile Menu Visibility
			$(".mobile-menu").toggleClass("mobile-menu-fix");
			// Auto-Collapsing Mobile Menu When Left Open
			var a = $(".menu-link").attr("class");
			if (direction == "up" && a == "menu-link active") {
				$(".menu-link").trigger("click");
			}
		}
	});

}(jQuery));