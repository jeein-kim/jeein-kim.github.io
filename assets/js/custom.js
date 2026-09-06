/* Back-to-top button: fades in once the page has scrolled past a threshold,
   and smooth-scrolls to the top via the same plugin the nav links use. */

(function($) {

	var $topButton = $('#top-button');

	if ($topButton.length) {

		$topButton.scrolly({
			speed: 1000
		});

		$(window).on('scroll', function() {

			if ($(window).scrollTop() > 400) {
				$topButton.addClass('visible');
			} else {
				$topButton.removeClass('visible');
			}

		}).trigger('scroll');

	}

	// Figure captions: a single gray tooltip that follows the cursor while
	// hovering any .research-figure that carries a data-caption.
		var $figureTooltip = $('<div id="figure-tooltip"></div>').appendTo('body'),
			margin = 16;

		$(document)
			.on('mouseenter', '.research-figure[data-caption]', function() {
				$figureTooltip.text($(this).attr('data-caption')).addClass('visible');
			})
			.on('mousemove', '.research-figure[data-caption]', function(e) {

				var left = e.clientX + margin,
					top = e.clientY + margin,
					maxLeft = $(window).width() - $figureTooltip.outerWidth() - margin,
					maxTop = $(window).height() - $figureTooltip.outerHeight() - margin;

				if (left > maxLeft) left = e.clientX - $figureTooltip.outerWidth() - margin;
				if (top > maxTop) top = e.clientY - $figureTooltip.outerHeight() - margin;

				$figureTooltip.css({ left: left, top: top });

			})
			.on('mouseleave', '.research-figure[data-caption]', function() {
				$figureTooltip.removeClass('visible');
			});

})(jQuery);
