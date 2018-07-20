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
        $('.color').click(function() {
            var text = $(this).attr('data-copy');
            var el = $(this);
            copyToClipboard(text, el);
            $('.copybutton', this).html("<i class='icon-icon_check'></i>");
        });
        $('.color').mouseenter(function() {
            $(this).addClass('copyview');
            $('.copybutton', this).html("COPY<br>HEX");

        });
        $('.color').mouseleave(function() {
            $(this).removeClass('copyview');
        });
    });

    $('.color').each(function() {
        var rgb1 = $('.swatch', this).css('background-color');
        $rgb = rgb1.replace(/[^\d,]/g, '').split(',');

        //console.log($rgb);
        //$rgbarray = $rgb;
        //console.log($rgbarray);


        $('.rgb', this).text($rgb);
        var hex = $(this).attr("data-copy");
        $contrast = getContrastYIQ(hex);
        $(this).addClass($contrast);


		n_match  = ntc.name(hex);
    n_name       = n_match[1]; // This is the text string for the name of the match

    $('.elem-subtitle', this).text(n_name);
        //isDark($(this).attr("data-copy"));
        //$(this).css("color", hextorgb($(this).css("background-color")) ? 'white' : 'black');
    });

    function hexToRgb(hex) {
        hex = hex.replace(/[^0-9A-F]/gi, '');
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return +r + ', ' + b + ', ' + b;
    }

    function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }

    // Determine if the background color of an element is light or dark
    function getContrastYIQ(hex) {
        var hexcolor = cutHex(hex)
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 131.5) ? 'lightbg' : 'darkbg';
    }





})(jQuery);