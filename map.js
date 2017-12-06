var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: new google.maps.LatLng(40.1280231,-101.1993017),
    mapTypeId: 'roadmap'
  });

  var features = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': 'data.json',
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
  })();

  var iconBase = 'https://cdn-images-1.medium.com/fit/c/72/72/1*21SNEVQgVb0q2Q8g1Xbkjg.png';
  // Create markers.
  console.log(features)
  features.map_items.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(feature.latitude, feature.longitude),
      icon: iconBase,
      map: map
    });
    marker.addListener('click', function() {
    	map.setZoom(8);
    	map.setCenter(marker.getPosition());
  	});
  });
}

