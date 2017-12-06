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
  features.map_items.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(feature.latitude, feature.longitude),
      icon: iconBase,
      map: map
    });

    var letterLinks = '<ul>'
    feature.letters.forEach(function(letter) {
        letterLink = '<li style="list-style:none;padding:5px;list-style-image:https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-512.png"><a style="font-size:14px;" href=' + letter.url + '>' + letter.Headline + '</a>  -  by ' + letter.Author + '</li>'
        letterLinks = letterLinks + letterLink
    });
    letterLinks = letterLinks + '</ul>'


    var contentString = '<div id="content">'+
            '<h1> Letters Published Near Here '+
            '</h1>'+
            '<div>'+
            letterLinks +
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

    marker.addListener('click', function() {
    	map.setZoom(8);
    	map.setCenter(marker.getPosition());
    	infowindow.open(map, marker);
  	});
  });
}

