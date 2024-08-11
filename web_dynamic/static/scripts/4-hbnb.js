$(document).ready(function () {
  // Dictionary to hold the selected amenities
  const selectedAmenities = {};

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if (this.checked) {
      // If checked, add the Amenity ID to the dictionary
      selectedAmenities[amenityId] = amenityName;
    } else {
      // If unchecked, remove the Amenity ID from the dictionary
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    const amenitiesList = Object.values(selectedAmenities).join(', ');
    if (amenitiesList.length > 0) {
      $('div.amenities h4').text(amenitiesList);
    } else {
      $('div.amenities h4').html('&nbsp;');
    }
  });
});

$(document).ready(function () {
  // Perform the GET request to check API status
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});

$.ajax({
  type: 'POST',
  url: 'http://localhost:5001/api/v1/places_search',
  data: '{}',
  headers: {
    'Content-Type': 'application/json'
  },
  success: function (data) {
    data.sort((a, b) => a.name.localeCompare(b.name));
    for (const result of data) {
      console.log(result.description);
      const pluralGuest = result.max_guest > 1 ? 's' : '';
      const pluralBedroom = result.number_rooms > 1 ? 's' : '';
      const pluralBathroom = result.number_bathrooms > 1 ? 's' : '';
      $('section.places').append(`<article>
        <div class="title_box">
          <h2>${result.name}</h2>
          <div class="price_by_night">$${result.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${result.max_guest} Guest${pluralGuest}</div>
          <div class="number_rooms">${result.number_rooms} Bedroom${pluralBedroom}</div>
          <div class="number_bathrooms">${result.number_bathrooms} Bathroom${pluralBathroom}</div>
        </div>
        <div class="user">
          <b>Owner:</b> TBD
        </div>
        <div class="description">
          ${result.description}
        </div>
      </article>`);
    }
  }
});
