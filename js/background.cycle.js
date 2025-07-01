/*
 * jQuery Background Cycle Plugin
 * Version: 1.0.0
 * Author: [Likely original author of the plugin you're using]
 * Description: Cycles through background images.
 *
 * NOTE: This is a placeholder. You should use the actual background.cycle.js file from your current website's assets.
 */
(function($) {
    $.fn.backgroundCycle = function(options) {
        var settings = $.extend({
            imageUrls: [],
            fadeSpeed: 1000,
            duration: 5000,
            backgroundSize: 'cover' // 'cover', 'contain', '100% 100%' etc.
        }, options);

        var $element = this;
        var currentIndex = 0;

        function cycleBackground() {
            if (settings.imageUrls.length === 0) return;

            var nextImage = settings.imageUrls[currentIndex];
            $element.css({
                'background-image': 'url("' + nextImage + '")',
                'background-size': settings.backgroundSize,
                'background-repeat': 'no-repeat',
                'background-position': 'center center',
                'transition': 'background-image ' + (settings.fadeSpeed / 1000) + 's ease-in-out'
            });

            currentIndex = (currentIndex + 1) % settings.imageUrls.length;

            setTimeout(cycleBackground, settings.duration);
        }

        // Start the cycle initially
        cycleBackground();

        return this; // For chaining
    };
}(jQuery));
