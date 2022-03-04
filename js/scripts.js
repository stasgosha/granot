document.addEventListener('DOMContentLoaded', function(){
	const isRTL = $('html').attr('dir') == 'rtl';
	const isMobile = $(window).width() < 992;

	let topMenu = $('.top-nav');

	let lastId,
		scrollIds = [],
		currentId = 0,
		topMenuHeight = 0,
		// All list items
		menuItems = topMenu.find("a"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function() {
			var item = $($(this).attr("href"));

			scrollIds.push($(this).attr("href"));

			if (item.length) {
				return item;
			}
		});

	let lastMenuItem = menuItems[menuItems.length - 1];

	// $('.go-down-btn').click(function(e){
	// 	e.preventDefault();

	// 	$('html, body').animate({
	// 		scrollTop: $(scrollIds[currentId + 1]).offset().top
	// 	}, 500);
	// });

	menuItems.eq(0).addClass('active');

	$(".wpcf7-form input").attr('autocomplete', 'off');

	// Input mask
	$('input[type="tel"]').mask("99-9999999", {autoclear: false});

	// top-nav
	$('.top-nav a').each(function(i, el){
		$(el).attr('data-text', $(el).text()).wrapInner('<div class="link-text"></div>');
	});

	// Bind to scroll
	$(window).scroll(function() {
		// Get container scroll position
		let fromTop = $(this).scrollTop() + topMenuHeight + $(window).height() * 0.6;

		// Get id of current scroll item
		let cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop)
				return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		let id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;

			// Set/remove active class
			menuItems.removeClass("active");
			menuItems.filter("[href='#" + id + "']").addClass("active");

			currentId = scrollIds.indexOf("#" + id);
		}
	});


	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-arrow slick-prev" aria-label="קודם"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 33"><path d="m1.41 1.41 15 15-15 15" stroke="#34434F" stroke-width="2" stroke-linecap="round"/><path d="m8.91 1.41 15 15-15 15" stroke="#34434F" stroke-width="2" stroke-linecap="round"/></svg></button>',
		nextArrow: '<button type="button" class="slick-arrow slick-next" aria-label="הַבָּא"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 33"><path d="m23.91 1.42-15 15 15 15" stroke="#34434F" stroke-width="2" stroke-linecap="round"/><path d="m16.41 1.42-15 15 15 15" stroke="#34434F" stroke-width="2" stroke-linecap="round"/></svg></button>'
	}

	$('.videos-component').each(function(i, cmp){
		const bigSlider = $(cmp).find('.big-slider');
		const previewsSlider = $(cmp).find('.previews-slider');

		bigSlider.slick({
			rtl: isRTL,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			centerMode: true,
			centerPadding: 0,
			asNavFor: previewsSlider,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						slidesToShow: 3,
						dots: true
					}
				}
			]
		});

		previewsSlider.slick({
			// rtl: isRTL,
			vertical: true,
			infinite: true,
			centerMode: true,
			centerPadding: 0,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			focusOnSelect: true,
			asNavFor: bigSlider
		});

		bigSlider.on('beforeChange', function(){
			$(this).find('.video-block.playing').each(function(i, el){
				$(el).removeClass('playing');
				$(el).find('.video-iframe').remove();
			});
		});

		$('.video-block .close-btn').click(function(e){
			e.preventDefault();
			e.stopPropagation();

			$(this).closest('.video-block').removeClass('playing').find('.video-iframe').remove();
		});
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let topNavHeight = 3.1250 / 100 * $(window).width();

		if ($(window).width() < 992) {
			topNavHeight = 0;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - topNavHeight
		}, 500);
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 50
			? header.classList.add('sticky')
			: header.classList.remove('sticky');
		};
	}

	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);

	// Video
	$('.video-block:not(.playing)').on('click', function (e) {
		if (!$(e.target).hasClass('play-btn')) return;

		const videoId = $(this).data('video-id');
		if (!videoId) return;

		const videoType = $(this).data('video-type') ? $(this).data('video-type').toLowerCase() : 'youtube';

		if (videoType == 'youtube') {
			$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"></div>');
			createVideo(videoId, videoId, this);
		} else if(videoType == 'vimeo'){
			$(this).find('.block-video-container').append('<div class="video-iframe" id="'+videoId+'"><iframe allow="autoplay" class="video-iframe" src="https://player.vimeo.com/video/'+videoId+'?playsinline=1&autoplay=1&transparent=0&app_id=122963"></div>');
			$(this).addClass('playing');
			$(this).closest('.testimonials-section').addClass('playing');
		}
	});

	var player;

	function createVideo(videoBlockId, videoId, that) {
		player = new YT.Player(videoBlockId, {
			videoId: videoId,
			playerVars: {
				// 'autoplay':1,
				'autohide': 1,
				'showinfo': 0,
				'rel': 0,
				'loop': 1,
				'playsinline': 1,
				'fs': 1,
				'allowsInlineMediaPlayback': true
			},
			events: {
				'onReady': function(e) {
					// e.target.mute();
					// if ($(window).width() > 991) {
					$(that).addClass('playing');
					$(that).closest('.testimonials-section').addClass('playing');
					setTimeout(function() {
						e.target.playVideo();
					}, 200);
					// }
				}
			}
		});
	}
});

function getScrollWidth() {
	// create element with scroll
	let div = document.createElement('div');

	div.style.overflowY = 'scroll';
	div.style.width = '50px';
	div.style.height = '50px';

	document.body.append(div);
	let scrollWidth = div.offsetWidth - div.clientWidth;

	div.remove();

	return scrollWidth;
}

let bodyScrolled = 0;

function showModal(modal) {
	$(modal).addClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').addClass('modal-visible')
		.scrollTop(bodyScrolled)
		.css('padding-right', getScrollWidth());
}

function hideModal(modal) {
	$(modal).removeClass('visible');
	bodyScrolled = $(window).scrollTop();
	$('body, .header').removeClass('modal-visible')
		.scrollTop(bodyScrolled)
		.css('padding-right', 0);
}