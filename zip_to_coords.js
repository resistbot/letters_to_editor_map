function getCoordinatesFor(zipcode) {
	geocoder = new google.maps.Geocoder();

	var lat = '';
    var lng = '';
    var request = {
    	    address: zipcode,
    	    componentRestrictions: {
        	    country: 'USA'
    	    }
		}

    geocoder.geocode(request, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
         lat = results[0].geometry.location.lat();
         lng = results[0].geometry.location.lng();
      } else {
        alert("Geocode was not successful: " + status);
      }
    });
    return new google.maps.LatLng(lat, lng);
}