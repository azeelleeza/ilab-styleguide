$(document).ready(function() {
    $(".menu-button").on('click', function() {
        $('#menu').toggleClass('open');

    });
    // Anchor arrow click
    // smooth scroll to anchor tag
    $('a[href*="#"]:not([href="#featured"])').click(function() { // Check to see if anchor tag is not carousel's featured link
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                // Smooth scroll to link section
                $('html, body').animate({
                    scrollTop: target.offset().top - 50
                }, 900);
                return false;
            }
        }
    });

    //highlight navigation
    $(window).scroll(function() {
        var windowpos = $(window).scrollTop();

        $(".section-container").each(function(index, element) {

            $name = $(this).attr('id');

            $pt = $(this).offset().top - 100;
            var index2 = index + 1;
            var scrollPercent = index2 / 6;

            //
            var scrollPercentRounded = Math.round(scrollPercent * 100);

            if (windowpos > $pt) {
                $('a').removeClass('active');
                $('a[href$="' + $name + '"]').addClass('active');
                $('.progress-bar--increment').css('height', scrollPercentRounded + '%');

            } else {
                $('a[href$="' + $name + '"]').removeClass('active');
            }

        });
        $secnum = $('a.active').attr('data-secn');
        //console.log($secnum);
        $('.sec-track .track').html($secnum);


        /* // pixels scrolled from top
         var scrollTop = $(window).scrollTop(),
             // document height
             docHeight = $(document).height(),
             // window height
             winHeight = $(window).height(),
             // percent of document scrolled
             scrollPercent = (scrollTop) / (docHeight - winHeight),
             scrollPercentRounded = Math.round(scrollPercent * 100);

         // incement progress bar as user scrolls
         $('.progress-bar--increment').css('height', scrollPercentRounded + '%');*/




        $sidebar = $('#sidebar').offset().top;
        if (windowpos > $sidebar) {
            $('#sidebar').addClass('fixed');
        }
          if (windowpos < $sidebar) {
            $('#sidebar').removeClass('fixed');
        }

    });

}); // on load