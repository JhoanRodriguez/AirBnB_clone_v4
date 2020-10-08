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

	$.ajax({
		url: 'http://localhost:5001/api/v1/places_search',
		type: 'POST',
		data: '{}',
		contentType: 'application/json',
		dataType: 'json',
		success: function (places) {
			const lengPlaces = places.length;
			for (let i = 0; i < lengPlaces; i++) {
				$('section.places').append(`<article>
		<div class="title_box">
		  <h2>${places[i].name}</h2>
		  <div class="price_by_night">${places[i].price_by_night}</div>
		</div>
		<div class="information">
		  <div class="max_guest">${places[i].max_guest}${places[i].max_guest > 1 ? ' Guests' : ' Guest'} </div>
	      <div class="number_rooms">${places[i].number_rooms}${places[i].number_rooms > 1 ? ' Bedrooms' : ' Bedroom'}</div>
			<div class="number_bathrooms">${places[i].number_bathrooms}${places[i].number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom'}</div>
		</div>
		<div class="user">                  
		      </div>
		      <div class="description">
		  ${places[i].description}
		      </div>
	      </article>`);
			}
		}
	});
});