var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(40.1280231,-101.1993017),
    mapTypeId: 'roadmap'
  });

  var iconBase = 'https://cdn-images-1.medium.com/fit/c/72/72/1*21SNEVQgVb0q2Q8g1Xbkjg.png';
  // Create markers.
  console.log(features)
  features.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: getCoordinatesFor(feature.zipcode),
      icon: iconBase,
      map: map
    });
    marker.addListener('click', function() {
    	map.setZoom(8);
    	map.setCenter(marker.getPosition());
  	});
  });
}

