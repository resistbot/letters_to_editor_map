var map;

function initMap() {
  var mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
    ]

  contiguousMap = new google.maps.Map(document.getElementById('contiguous_map'), {
    zoom: 5,
    center: new google.maps.LatLng(38.1280231,-95.1993017),
    styles: mapStyle
  });
  markupMapFor(contiguousMap);

  alaskaMap = new google.maps.Map(document.getElementById('alaska_map'), {
    zoom: 4,
    center: new google.maps.LatLng(64.0000, -150.0000),
    styles: mapStyle
  });
  markupMapFor(alaskaMap);

  hawaiiMap = new google.maps.Map(document.getElementById('hawaii_map'), {
    zoom: 6,
    center: new google.maps.LatLng(20.3114, -157.1264),
    styles: mapStyle
  });
  markupMapFor(hawaiiMap);

}

function markupMapFor(map) {

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

    var letterLinks = '<ul style="padding-left:-10px;">'
    feature.letters.forEach(function(letter) {
        letterLink = '<li style="list-style:none;padding-top:5px;padding-left:-10px;list-style-image:https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/news-512.png"><a style="font-size:14px;" href=' + letter.url + '>' + letter.Headline + '</a>  -  by ' + letter.Author + '</li>'
        letterLinks = letterLinks + letterLink
    });
    letterLinks = letterLinks + '</ul>'


    var contentString = '<div id="content">'+
            '<h1>'+
            feature.letters[0].Newspaper +
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

