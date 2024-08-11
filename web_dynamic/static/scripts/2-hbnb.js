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
