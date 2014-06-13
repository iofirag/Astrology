/* Left Menu */
/*====================================
=            ON DOM READY            =
====================================*/
$(function() {
    $('.toggle-nav-left').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleNav_Left();
    });
});


/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
function toggleNav_Left() {
    if ($('#site-wrapper').hasClass('show-nav-left')) {
        // Do things on Nav Close
        $('#site-wrapper').removeClass('show-nav-left');
    } else {
        // Do things on Nav Open
        $('#site-wrapper').addClass('show-nav-left');
    }
    //$('#site-wrapper').toggleClass('show-nav');
}






/* Right Menu */
/*====================================
=            ON DOM READY            =
====================================*/
$(function() {
    $('.toggle-nav-right').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleNav_right();
    });
});


/*========================================
=            CUSTOM FUNCTIONS            =
========================================*/
function toggleNav_right() {
    if ($('#site-wrapper').hasClass('show-nav-right')) {
        // Do things on Nav Close
        $('#site-wrapper').removeClass('show-nav-right');
    } else {
        // Do things on Nav Open
        $('#site-wrapper').addClass('show-nav-right');
    }
    //$('#site-wrapper').toggleClass('show-nav');
}