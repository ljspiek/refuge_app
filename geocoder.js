const rootUrl = 
"https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0";
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

   
  //allows user to enter address and center map on location
  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({ address }, function(results, status) {
      const lat = results[0].geometry.location.lat();
      const lng = results[0].geometry.location.lng();
      fetch(`${rootUrl}&lat=${lat}&lng=${lng}`)
         .then(res => res.json()
         .then(data => console.log(data)));
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
}
