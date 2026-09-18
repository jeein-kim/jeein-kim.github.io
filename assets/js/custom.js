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

	// Collapsible CV sections: the heading toggles its section. Sections carry
	// .is-open in the markup, so the initial state is right before this runs.
		var $collapsibles = $('.cv-page .collapsible');

		if ($collapsibles.length) {

			var toggleSection = function($section, open) {

				if (typeof open == 'undefined')
					open = !$section.hasClass('is-open');

				$section.toggleClass('is-open', open);
				$section.children('h2').attr('aria-expanded', open ? 'true' : 'false');

			};

			$collapsibles.children('h2')
				.on('click', function() {
					toggleSection($(this).parent());
				})
				.on('keydown', function(e) {

					// Enter or Space, like a button.
						if (e.which == 13 || e.which == 32) {
							e.preventDefault();
							toggleSection($(this).parent());
						}

				});

			// Expand all / Close all.
				$('[data-cv-toggle]').on('click', function() {

					var open = ($(this).attr('data-cv-toggle') == 'expand');

					$collapsibles.each(function() {
						toggleSection($(this), open);
					});

				});

			// A link into a collapsed section opens it first, so the scroll
			// lands somewhere that exists.
				var openTarget = function(hash) {

					if (!hash || hash.charAt(0) != '#')
						return;

					var $target = $(hash);

					if ($target.length && $target.hasClass('collapsible'))
						toggleSection($target, true);

				};

			$('a[href^="#"]').on('click', function() {
				openTarget($(this).attr('href'));
			});

			openTarget(window.location.hash);

		}

})(jQuery);
