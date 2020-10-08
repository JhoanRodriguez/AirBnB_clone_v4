$(document).ready(function () {
	let amenities = {};

	$('div .amenities .popover ul li INPUT').click(function () {
		const amenityName = $(this).attr("data-name");
		const amenityID = $(this).attr("data-id");

		$('div .amenities h4').css({
			width: '98%',
			height: '98%',
			'white-space': 'nowrap',
			overflow: 'hidden',
			'text-overflow': 'ellipsis',
			'padding-bottom': '16px'
		});

		if ($(this).is(':checked')) {
			amenities[amenityID] = amenityName;
		} else {
			delete amenities[amenityID];
		}
		$('div.amenities h4').text(Object.values(amenities).join(', '));
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
		success: appendData
	});

	$('button').click(function () {
		$('section.places').empty();
		$.ajax({
			url: 'http://localhost:5001/api/v1/places_search',
			type: 'POST',
			data: JSON.stringify({ 'amenities': Object.keys(amenities) }),
			contentType: 'application/json',
			dataType: 'json',
			success: appendData
		});
	});
});

function appendData(data) {
	const lengData = data.length;
	for (let i = 0; i < lengData; i++) {
		$('SECTION.places').append(
			`<article>
		 <div class="title_box">
		   <h2>${data[i].name}</h2>
		   <div class="price_by_night">${data[i].price_by_night}</div>
		 </div>
		 <div class="information">
		   <div class="max_guest">${data[i].max_guest}${data[i].max_guest > 1 ? ' Guests' : ' Guest'} </div>
	       <div class="number_rooms">${data[i].number_rooms}${data[i].number_rooms > 1 ? ' Bedrooms' : ' Bedroom'}</div>
			 <div class="number_bathrooms">${data[i].number_bathrooms}${data[i].number_bathrooms > 1 ? ' Bathrooms' : ' Bathroom'}</div>
		 </div>
		 <div class="user">                  
		       </div>
		       <div class="description">
		   ${data[i].description}
		       </div>
	       </article>`
		);
	}
}
