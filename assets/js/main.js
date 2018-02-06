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
			copyToClipboard(text, el);
			$('.copybutton', this).text("Copied!");
		});
		$('.swatch').mouseenter(function() {
			$(this).addClass('copyview');


		});
		$('.swatch').mouseleave(function() {
			$(this).removeClass('copyview');
			$('.copybutton', this).text("Copy HEX");
		});
	});

	$('.swatch').each(function() {
		$rgb = hexToRgb($(this).attr("data-copy"));
			$('.rgb', this).text($rgb);
			$contrast = getContrastYIQ($(this).attr("data-copy"));
			$('.swatch-color', this).addClass($contrast);
		//isDark($(this).attr("data-copy"));
		//$(this).css("color", hextorgb($(this).css("background-color")) ? 'white' : 'black');
	});

	function hexToRgb(h)
{
    var r = parseInt((cutHex(h)).substring(0,2),16), g = ((cutHex(h)).substring(2,4),16), b = parseInt((cutHex(h)).substring(4,6),16)
    return  + r+', '+b+', '+b;
}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}


// Determine if the background color of an element is light or dark
 function getContrastYIQ(hex){
 	var hexcolor = cutHex(hex)
	var r = parseInt(hexcolor.substr(0,2),16);
	var g = parseInt(hexcolor.substr(2,2),16);
	var b = parseInt(hexcolor.substr(4,2),16);
	var yiq = ((r*299)+(g*587)+(b*114))/1000;
	return (yiq >= 128) ? 'darktext' : 'lighttext';


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

})(jQuery);