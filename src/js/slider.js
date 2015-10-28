// Licence here

/**
 * Maarad JavaScript Slider
 * 
 * Maarad is a Pure JS Slider, written by @ArabyAlhomsi
 * "Maarad" is an Arabic word that means gallery.
 */

/**
 * Function to set the value of transform: translate3d()
 * @return {String} that look like translate3d(0px,0px,0px)	
 */
function setTranslate3d(x, y, z) {
    'use strict';

	return 'translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)';
}


/**
 * Maarad this function creates new instances from Maarad
 * @constructor
 * @return <>
 */
var Maarad = function (options) {
    'use strict';
	options = options || {};

	var slider                = document.getElementById(options.SliderID),
		sliderWidth           = slider.offsetWidth,
		sliderInner           = slider.getElementsByClassName('slider__inner')[0],
		slides                = slider.getElementsByClassName('slider-slide'),
		slidesLength          = slides.length,
		sliderNext            = slider.getElementsByClassName('slider__next')[0],
		sliderPrev            = slider.getElementsByClassName('slider__prev')[0],
        sliderInnerWidth      = 0,
        i 					  = 0;

    // Set width for all slides
	for (i = 0; i < slidesLength; i++) {
		// the width should be the same as slider width
		slides[i].style.width = sliderWidth + 'px';
	}

	// Set slider__inner width
	sliderInnerWidth = slidesLength * slides[0].offsetWidth;
	sliderInner.style.width =  sliderInnerWidth + 'px';
	sliderInner.style.transform = setTranslate3d(0, 0, 0);

	// on click on the next button
	sliderNext.addEventListener('click', function() {
        var currentTransform = 0,
            newTransform = 0;

        // get slider__inner current transform value
        currentTransform = parseInt(sliderInner.style.transform
							  .toString()
							  .split('(')[1]
							  .split(',')[0]
							  .replace('px', ''));

        // convert the value from negative to positive
		if (currentTransform < 0) {
			currentTransform = parseInt(currentTransform
							  .toString()
							  .replace('-', ''));
		}

		newTransform = (currentTransform + sliderWidth);

		// if the new transform is wider than 
		// the container (slider__inner) itself
		if (newTransform >= sliderInnerWidth) {
			// move the user to the start point
			if (options.infinity) {
				newTransform = 0;
			} else {
				// don't do anything
				newTransform = sliderInnerWidth - sliderWidth;
			}
		}

		// set the slider inner to the new value
		sliderInner.style.transform = setTranslate3d(-newTransform, 0, 0);
	});

	// on click on the previous button
	sliderPrev.addEventListener('click', function() {
		var currentTransform = 0,
            newTransform = 0;
        // get slider__inner current transform value
        currentTransform = parseInt(sliderInner.style.transform
							  .toString()
							  .split('(')[1]
							  .split(',')[0]
							  .replace('px', ''));

        newTransform = (currentTransform + sliderWidth);

		if (newTransform > 0) {
			newTransform = 0;
		}

		// set the slider inner to the new value
		sliderInner.style.transform = setTranslate3d(newTransform, 0, 0);

	});
	// Automatic Slider movement is under development
	if (options.auto) {
		var intervalInstance;
		
		var sliderInterval = function (seconds, jobFunction) {
			if (!intervalInstance) {
				intervalInstance = setInterval(function () {
					jobFunction();
				}, seconds);
			}
			return intervalInstance;	
		};
		
		sliderInterval(options.auto, function () {
			sliderNext.click();
		});
		
		var mouseenterInterval;

		slider.addEventListener('mouseenter', function(){
			var secondsCounter = 0;

				var mouseenterInterval = setInterval(function(){
					secondsCounter++;

					if (secondsCounter > 0.5) {
						clearInterval(intervalInstance);
						intervalInstance = undefined;
						clearInterval(mouseenterInterval);
					}

				}, 1000);

		});

		slider.addEventListener('mouseleave', function () {
			sliderInterval(options.auto, function () {
				sliderNext.click();
			});
		});
	}
};