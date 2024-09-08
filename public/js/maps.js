document.addEventListener('DOMContentLoaded', function () {
  if (typeof projectAddress !== 'undefined') {
    geocodeAddress(projectAddress);
  } else {
    initMap({ lat: 41.8919, lng: -87.610168 });
  }
});
//initializes the map, gives default address if one isnt provided
function geocodeAddress(address) {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: address }, function (results, status) {
    if (status === 'OK') {
      const location = results[0].geometry.location;
      initMap(location);
    } else {
      console.error(
        'Geocode was not successful for the following reason: + status'
      );
    }
  });
}
//pull location from the user entered address, enters in geocoder
function initMap(location) {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: location,
  });

  new google.maps.Marker({
    position: location,
    map: map,
    title: 'Location',
  });
}
//this returns new map with new location from User entered address