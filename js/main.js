// js/main.js

jQuery(document).ready(function($) {
    // --- Mobile Menu Toggle ---
    // Opens the mobile navigation overlay when the hamburger icon is clicked
    $('.menu-toggle').on('click', function() {
        $('.mobile-nav-overlay').addClass('open');
        // Optional: Disable body scrolling when menu is open
        $('body').css('overflow', 'hidden');
    });

    // Closes the mobile navigation overlay when the 'X' icon is clicked
    $('.mobile-nav-close').on('click', function() {
        $('.mobile-nav-overlay').removeClass('open');
        // Optional: Re-enable body scrolling
        $('body').css('overflow', 'auto');
    });

    // Closes the mobile navigation overlay when a link inside it is clicked
    // This is useful for single-page applications or when navigating to another page
    $('.mobile-nav-overlay .nav-menu a').on('click', function() {
        // Check if the clicked item has a sub-menu that needs to expand first
        if ($(this).parent().hasClass('menu-item-has-children') && $(window).width() < 768) {
            // For mobile, we want to allow sub-menus to open on click, not close the whole menu
            // If the sub-menu is not open, prevent default to open it
            if (!$(this).parent().children('.sub-menu').is(':visible')) {
                return; // Let the sub-menu toggle logic handle it
            }
        }
        $('.mobile-nav-overlay').removeClass('open');
        $('body').css('overflow', 'auto'); // Re-enable body scrolling
    });

    // --- Sub-menu Toggle for Mobile (for 'MENU' and 'CONTACT' dropdowns) ---
    // When a menu item with children is clicked on mobile, toggle its sub-menu
    $('.mobile-nav-overlay .menu-item-has-children > a').on('click', function(e) {
        if ($(window).width() < 768) { // Only apply this logic on mobile devices
            e.preventDefault(); // Prevent the default link behavior (e.g., navigating to /menu.html)
            var $subMenu = $(this).parent().children('.sub-menu');
            $subMenu.slideToggle(300); // Slide up/down the sub-menu
            $(this).children('i').toggleClass('fa-caret-down fa-caret-up'); // Toggle the arrow icon
        }
    });

    // --- Active Link Highlighting (for desktop and mobile after load) ---
    // This script will highlight the current page in the navigation.
    // It's a basic client-side check and assumes clean URLs like /about.html
    var path = window.location.pathname;
    // Remove trailing slash for root URL comparison
    if (path === '/') {
        path = '/index.html'; // Treat root as index.html for matching
    }
    $('.nav-menu a').each(function() {
        var href = $(this).attr('href');
        // Normalize href for comparison (remove leading slash if not root, remove .html extension)
        var normalizedHref = href.replace(/^\/|\.html$/g, '');
        var normalizedPath = path.replace(/^\/|\.html$/g, '');

        if (normalizedPath === normalizedHref) {
            // Remove previous current-menu-item and add to the current one
            $('.nav-menu .current-menu-item').removeClass('current-menu-item');
            $(this).parent().addClass('current-menu-item');

            // Also ensure parent 'menu-item-has-children' is correctly highlighted if a sub-item is active
            $(this).parents('.menu-item-has-children').addClass('current-menu-item');
        }
    });

    // --- Smooth Scrolling for Anchor Links (e.g., /menu.html#woodinville) ---
    $('a[href^="/#"], a[href*=".html#"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault(); // Prevent default anchor click behavior
            var hash = this.hash;

            // Check if the target exists on the current page
            if ($(hash).length) {
                // Adjust scroll position to account for sticky header
                var headerHeight = $('.site-header').outerHeight();
                $('html, body').animate({
                    scrollTop: $(hash).offset().top - headerHeight - 20 // -20 for a little extra padding
                }, 800, function(){
                    // Optional: Add hash to URL after scroll completes for direct linking
                    // window.location.hash = hash;
                });
            }
        }
    });

    // --- Google Maps Embed (if you put it on Contact page) ---
    // Basic example if you want to delay map loading or manage it via JS
    // var mapLoaded = false;
    // $(window).on('scroll', function() {
    //      if (!mapLoaded && $(window).scrollTop() + $(window).height() > $('#map-container').offset().top - 200) {
    //          // Load map API or embed iframe here
    //          // Example: $('#map-container').html('<iframe src="YOUR_Maps_EMBED_URL" ...></iframe>');
    //          mapLoaded = true;
    //      }
    // });

    // --- BACKGROUND CYCLING INITIALIZATION (ADD THIS BLOCK HERE) ---
    // This assumes background.cycle.js is loaded BEFORE main.js in your HTML
    if ($.fn.backgroundCycle) { // Check if the plugin exists
        $("#bg-container").backgroundCycle({
            imageUrls: [
                '/images/background/bg1.jpg',
                '/images/background/bg2.jpg',
                '/images/background/bg3.jpg',
                '/images/background/bg5.jpg',
                '/images/background/bg6.jpg',
                '/images/background/bg7.jpg',
                '/images/background/bg8.jpg'
            ],
            fadeSpeed: 1000, /* Slower fade for elegance */
            duration: 6000, /* Longer display duration per image */
            backgroundSize: 'cover' /* Use 'cover' directly from JS plugin */
        });
    } else {
        console.warn("background.cycle.js plugin not found. Background cycling will not work.");
    }
    // --- END BACKGROUND CYCLING INITIALIZATION ---

}); // This is the very last closing bracket for jQuery(document).ready()
