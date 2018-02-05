(function($) {

	/*

	    The Color Blindness Simulation function is
	    copyright (c) 2000-2001 by Matthew Wickline and the
	    Human-Computer Interaction Resource Network ( http://hcirn.com/ ).
	    
	    It is used with the permission of Matthew Wickline and HCIRN,
	    and is freely available for non-commercial use. For commercial use, please
	    contact the Human-Computer Interaction Resource Network ( http://hcirn.com/ ).

	    ------------------------
	    blind.protan =
	        cpu = 0.735; // confusion point, u coord
	        cpv = 0.265; // confusion point, v coord
	        abu = 0.115807; // color axis begining point (473nm), u coord
	        abv = 0.073581; // color axis begining point (473nm), v coord
	        aeu = 0.471899; // color axis ending point (574nm), u coord
	        aev = 0.527051; // color axis ending point (574nm), v coord
	    blind.deutan =
	        cpu =  1.14; // confusion point, u coord
	        cpv = -0.14; // confusion point, v coord
	        abu = 0.102776; // color axis begining point (477nm), u coord
	        abv = 0.102864; // color axis begining point (477nm), v coord
	        aeu = 0.505845; // color axis ending point (579nm), u coord
	        aev = 0.493211; // color axis ending point (579nm), v coord
	    blind.tritan =
	        cpu =  0.171; // confusion point, u coord
	        cpv = -0.003; // confusion point, v coord
	        abu = 0.045391; // color axis begining point (490nm), u coord
	        abv = 0.294976; // color axis begining point (490nm), v coord
	        aeu = 0.665764; // color axis ending point (610nm), u coord
	        aev = 0.334011; // color axis ending point (610nm), v coord
	            
	    m = (aev - abv) / (aeu - abu); // slope of color axis
	    yi = blind[t].abv - blind[t].abu * blind[t].m; // "y-intercept" of axis (on the "v" axis at u=0)

	*/

	var cbName = $('input[name = "colorblind"]:checked').val();

	var typeName = function(nameType) {

		var b = {
			'Normal': [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			'Protanopia': [0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			'Protanomaly': [0.817, 0.183, 0, 0, 0, 0.333, 0.667, 0, 0, 0, 0, 0.125, 0.875, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			'Deuteranopia': [0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			'Deuteranomaly': [0.8, 0.2, 0, 0, 0, 0.258, 0.742, 0, 0, 0, 0, 0.142, 0.858, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			'Tritanopia': [0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			'Tritanomaly': [0.967, 0.033, 0, 0, 0, 0, 0.733, 0.267, 0, 0, 0, 0.183, 0.817, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			'Achromatopsia': [0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
			'Achromatomaly': [0.618, 0.320, 0.062, 0, 0, 0.163, 0.775, 0.062, 0, 0, 0.163, 0.320, 0.516, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]
		};
		var n = String(nameType);
		var t = b[n];
		//console.log(t);
		return t;
	};

	$('input[name = "colorblind"]').on('change', function() {
		var cbType = String(this.value);
		$(".swatch").each(function(index) {
			$hex = $(this).attr("data-copy");
			var rgb = hexToRgb($hex);
			//console.log(rgb);
			//$hex = rgbToHex(rgb);
			var rgbfix = hexToRgb($hex);
			//console.log(blindType);
			if (cbType == "Grayscale") {
				var r = rgbfix.R;
				var g = rgbfix.G;
				var b = rgbfix.B;
				var intensity = 0.3 * r + 0.59 * g + 0.11 * b;
				var k = 1;
				R1 = Math.floor(intensity * k + r * (1 - k));
				G1 = Math.floor(intensity * k + g * (1 - k));
				B1 = Math.floor(intensity * k + b * (1 - k));
				var hexcode = rgbToHex(R1, G1, B1);

				//$(".grayscaleOrder").html("<div class='clearfix'></div>");
				//contrastList.sort(sortFunction);

			} else {
				var blindType = typeName(cbType);

				var typeblind = ColorMatrix(rgbfix, blindType);
				var R1 = typeblind.R;
				var G1 = typeblind.G;
				var B1 = typeblind.B;
				var hexcode = rgbToHex(typeblind.R, typeblind.G, typeblind.B);
			};
			$(this).children(".swatch-color").css("background-color", hexcode);
			$(this).children(".swatch-container").children(".swatch-color").css("background-color", hexcode);

		});
	})

	var ColorMatrix = function(o, m) { // takes: RGB object, Matrix array

		function fu(n) { return (n < 0 ? 0 : (n < 255 ? n : 255)); }

		var r = ((o.R * m[0]) + (o.G * m[1]) + (o.B * m[2]));
		var g = ((o.R * m[5]) + (o.G * m[6]) + (o.B * m[7]));
		var b = ((o.R * m[10]) + (o.G * m[11]) + (o.B * m[12]));

		return ({ 'R': fu(r), 'G': fu(g), 'B': fu(b) });

	};

	function hexToRgb(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		return result ? {
			R: parseInt(result[1], 16),
			G: parseInt(result[2], 16),
			B: parseInt(result[3], 16)
		} : null;

	}

	function rgbToHex(r1, g1, b1) {
		var r = Math.round(r1);
		var g = Math.round(g1);
		var b = Math.round(b1);
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}

	function luminanace(r, g, b) {
		var a = [r, g, b].map(function(v) {
			v /= 255;
			return v <= 0.03928 ?
				v / 12.92 :
				Math.pow((v + 0.055) / 1.055, 2.4);
		});
		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
	}

	function contrast(r, g, b) {
		//console.log(r + " " + g + " " + b);
		return (luminanace(255, 255, 255) + 0.05) /
			(luminanace(r, g, b) + 0.05);
	}

})(jQuery);