/*
	Forty by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	// COPY TO CLIPBOARD
	// Attempts to use .execCommand('copy') on a created text field
	// Falls back to a selectable alert if not supported
	// Attempts to display status in Bootstrap tooltip
	// ------------------------------------------------------------------------------

	function copyToClipboard(text, el) {
		var copyTest = document.queryCommandSupported('copy');
		var elOriginalText = el.attr('data-original-title');

		if (copyTest === true) {
			var copyTextArea = document.createElement("textarea");
			copyTextArea.value = text;
			document.body.appendChild(copyTextArea);
			copyTextArea.select();
			try {
				var successful = document.execCommand('copy');
				var msg = successful ? 'Copied!' : 'Whoops, not copied!';
				el.attr('data-original-title', msg).tooltip('show');
			} catch (err) {

			}
			document.body.removeChild(copyTextArea);
			el.attr('data-original-title', elOriginalText);
		} else {
			// Fallback if browser doesn't support .execCommand('copy')
			window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
		}
	}

	$(document).ready(function() {
		// Initialize
		// ---------------------------------------------------------------------

		// Tooltips
		// Requires Bootstrap 3 for functionality

		// Copy to clipboard
		// Grab any text in the attribute 'data-copy' and pass it to the 
		// copy function
		$('.swatch').click(function() {
			var text = $(this).attr('data-copy');
			var el = $(this);
			console.log(text);
			copyToClipboard(text, el);
			$('.copybutton', this).html("<i class='icon-icon_check'></i>");
		});
		$('.swatch').mouseenter(function() {
			$(this).addClass('copyview');
			$('.copybutton', this).html("<i class='icon-docs'></i>");

		});
		$('.swatch').mouseleave(function() {
			$(this).removeClass('copyview');
		});
	});

	$('.swatch').each(function() {
		var rgb1 = $('.swatch-color', this).css('background-color');

		//console.log(rgb1);
		$rgb = rgb1.replace(/[^\d,]/g, '').split(',');

		//console.log($rgb);
		//$rgbarray = $rgb;
		//console.log($rgbarray);
		
		$cmyk = rgb2cmyk($rgb);
		$('.rgb', this).text($rgb);
		$('.cmyk', this).text($cmyk);
		$contrast = getContrastYIQ($(this).attr("data-copy"));
		$('.swatch-color', this).addClass($contrast);

		//isDark($(this).attr("data-copy"));
		//$(this).css("color", hextorgb($(this).css("background-color")) ? 'white' : 'black');
	});

	function hexToRgb(hex) {
		hex = hex.replace(/[^0-9A-F]/gi, '');
		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		return + r + ', ' + b + ', ' + b;
	}

	function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }

	// Determine if the background color of an element is light or dark
	function getContrastYIQ(hex) {
		var hexcolor = cutHex(hex)
		var r = parseInt(hexcolor.substr(0, 2), 16);
		var g = parseInt(hexcolor.substr(2, 2), 16);
		var b = parseInt(hexcolor.substr(4, 2), 16);
		var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
		return (yiq >= 128) ? 'darktext' : 'lighttext';

	}

	function rgb2cmyk(arrayrgb) {
		var computedC = 0;
		var computedM = 0;
		var computedY = 0;
		var computedK = 0;

		var r1 = arrayrgb[0];
		var g1 = arrayrgb[1];
		var b1 = arrayrgb[2];
		
		var r = parseInt(('' + r1).replace(/\s/g, ''), 10);
		var g = parseInt(('' + g1).replace(/\s/g, ''), 10);
		var b = parseInt(('' + b1).replace(/\s/g, ''), 10);

		r = r / 255;
		g = g / 255;
		b = b / 255;
		k = Math.min(1 - r, 1 - g, 1 - b);
		c = (1 - r - k) / (1 - k);
		m = (1 - g - k) / (1 - k);
		y = (1 - b - k) / (1 - k);
		c = Math.round(c * 100);
		m = Math.round(m * 100);
		y = Math.round(y * 100);
		k = Math.round(k * 100);
		return  c + ', ' +  m + ', ' +  y + ', ' +  k;

	}

	// Smooth Scroll Anchor Links

	// Add smooth scrolling to all links
	$("a").on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {

			if ($(this.hash).length) {
				// Prevent default anchor click behavior
				event.preventDefault();
			}

			// Store hash
			var hash = this.hash;

			if ($(".post-nav").length) {
				var headerHeight = parseInt($(".site-header").css("top")) - 125;
				var postNav = $(".post-nav").height();
				var scrollTo = $(hash).offset().top - headerHeight - postNav;
			} else {
				var scrollTo = $(hash).offset().top - 20;
			}

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area

			function runOnce(fn) {
				var count = 0;
				return function() {
					if (++count == 1)
						fn.apply(this, arguments);
				};
			};

			$('body, html').animate({ scrollTop: scrollTo }, 800, runOnce(function() {
				// Remove currentScroll class from ToC link
				$(".post-nav-toc a.currentScroll").removeClass("currentScroll");

				// Update URL Hash
				if (history.replaceState) {
					history.replaceState(null, null, hash);
				} else {
					location.hash = hash;
				}
			}));
		} // End if
	});

	// Toggle Color Blind Filters
	$(".colorblindbutton").on('click', function(event) {
		$('#colorblindradios').toggleClass('open');
		//console.log();
	});

	//Open mobile Nav
	$(document).ready(function() {
		/* Menu fade/in out on mobile */
		$(".open-button").click(function(e) {
			e.preventDefault();
			$("#sidebar, .content-wrapper").toggleClass('mobile-open');
		});

	});

	$(document).ready(function() {
		$('.logo').on('click', function() {
			//$('.download-capable:after', this).css({'color': 'red'});
			$(this).addClass('show-download');
		});
		$('.logo').on('mouseenter', function() {
			$(this).addClass('show-bg');

		});
		$('.logo').on('mouseleave', function() {
			if ($(this).hasClass('show-download')) {
				$(this).removeClass('show-download');
			}
			if ($(this).hasClass('show-bg')) {
				$(this).removeClass('show-bg');
			}

		});

	});

})(jQuery);