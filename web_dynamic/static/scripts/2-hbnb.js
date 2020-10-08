$(document).ready(function () {
	const myAmenities = [];
	$('div .amenities .popover ul li INPUT').click(function () {
		const amenityName = $(this).attr('data-name');

		$('div .amenities h4').css({
			width: '98%',
			height: '98%',
			'white-space': 'nowrap',
			overflow: 'hidden',
			'text-overflow': 'ellipsis',
			'padding-bottom': '16px'
		});

		if ($(this).is(':checked')) {
			myAmenities.push(amenityName);
		} else {
			const idx = myAmenities.indexOf(amenityName);
			myAmenities.splice(idx, 1);
		}
		$('div.amenities h4').text(myAmenities.join(', '));
	});

	$.get('http://localhost:5001/api/v1/status', function (data, status) {
		if (data.status === 'OK') {
			$('div#api_status').addClass('available');
		}
	});
});