/*
 * background.cycle.js
 * A modern, lightweight vanilla JavaScript background image cycler.
 * Creates a smooth cross-fade effect for a more elegant transition.
 */
function BackgroundCycler(element, options) {
    if (!element) {
        console.error("BackgroundCycler: Target element not found.");
        return;
    }

    const defaults = {
        imageUrls: [],
        fadeSpeed: 1500, // Time in ms for the fade transition
        duration: 5000,  // Time in ms to display each image
    };

    this.settings = { ...defaults, ...options };
    this.element = element;
    this.currentIndex = 0;
    this.slides = []; // Will hold the slide elements

    this.init();
}

BackgroundCycler.prototype.init = function() {
    if (this.settings.imageUrls.length === 0) {
        console.warn("BackgroundCycler: No image URLs provided.");
        return;
    }

    // Style the main container
    this.element.style.position = 'relative';
    this.element.style.overflow = 'hidden';

    // Create and preload slides
    this.settings.imageUrls.forEach((url, index) => {
        const slide = document.createElement('div');
        slide.style.position = 'absolute';
        slide.style.top = '0';
        slide.style.left = '0';
        slide.style.width = '100%';
        slide.style.height = '100%';
        slide.style.backgroundImage = `url('${url}')`;
        slide.style.backgroundSize = 'cover';
        slide.style.backgroundPosition = 'center center';
        slide.style.opacity = (index === 0) ? '1' : '0'; // First slide is visible
        slide.style.transition = `opacity ${this.settings.fadeSpeed / 1000}s ease-in-out`;

        this.element.appendChild(slide);
        this.slides.push(slide);
    });

    // Preload images to prevent flashing on first cycle
    this.preloadImages();
};

BackgroundCycler.prototype.preloadImages = function() {
    this.settings.imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
    // Once images are likely cached, start the cycle
    setTimeout(() => this.startCycle(), this.settings.duration);
};

BackgroundCycler.prototype.startCycle = function() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;

    // Fade out the current slide
    this.slides[this.currentIndex].style.opacity = '0';
    // Fade in the next slide
    this.slides[nextIndex].style.opacity = '1';

    this.currentIndex = nextIndex;

    // Set the timeout for the next cycle
    setTimeout(() => this.startCycle(), this.settings.duration);
};
