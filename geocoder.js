const url = "https://www.refugerestrooms.org/api/v1/restrooms?";
//creating default with center location in Washington, DC
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {lat: 38.9072, lng: -77.0369}
    });
    var geocoder = new google.maps.Geocoder();
  
    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });

    getRefugeLocations (function (data) {
        // let locations = data.name;
        let name, latLng;

        for (i in data) {
            name = data[i].name;
            latLng = new google.maps.LatLng(data[i].latitude, data[i].longitude);

            let marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: data[i].name,
            });
        }
    })
  }
  
  //allows user to enter address and center map on location
  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  function getRefugeLocations (callback) {
      fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
        
  }


