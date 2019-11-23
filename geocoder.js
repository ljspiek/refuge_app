const rootUrl = 
"https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=100&offset=0";

//creating default with center location in Washington, DC
function initMap() {
  let myLatLng = {lat: 38.9071923, lng: -77.0368707};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 38.9072, lng: -77.0369}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
    
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: "test",
      })
  });
}
//creates markers and infowindows for all Refuge locations
function placeMarkers(data, map) {
  for(let i = 0; i < data.length; i++) {
    let name = data[i].name;
    let markerLatLng = {lat: data[i].latitude, lng: data[i].longitude}
    // console.log(name);
    let directions = data[i].directions;
    let comments = data[i].comment;
    let accessible = data[i].accessible;
    let unisex = data[i].unisex;
    let changingTable = data[i].changing_table;
    let contentString = `<h4 class="Name">${name}</h4>
    <ul class = "refugeFeatures">
        <li class = refugeFeatures-items>Directions: ${directions}</li>
        <li class = refugeFeatures-items>Comments: ${comments}</li>
        <li class = refugeFeatures-items>Unisex: ${unisex}</li>
        <li class = refugeFeatures-items>Accessible: ${accessible}</li>
        <li class = refugeFeatures-items>Changing Table: ${changingTable}</li>
    </ul>`;
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    let marker = new google.maps.Marker({
      position: markerLatLng,
      map: map,
      title: name,
      // directions: directions,
      // comments: comments
    });

    
     
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }
}
   
  //allows user to enter address and center map on location
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({ address }, function(results, status) {
    console.log(results[0]);
    if (!results[0]) {
      $.toast({
        heading: 'Error',
        text: 'Report any <a href="https://github.com/kamranahmedse/jquery-toast-plugin/issues">issues</a>',
        showHideTransition: 'fade',
        icon: 'error'
      })
    }
    const lat = results[0].geometry.location.lat();
    const lng = results[0].geometry.location.lng();
    // latLng = {`lat:${'lat'}, lng: ${'lng'} `}
    console.log(lat);
    console.log(lng);
    fetch(`${rootUrl}&lat=${lat}&lng=${lng}`)
        .then(res => res.json())
        .then(data => {
        placeMarkers(data, resultsMap);
        resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location,
            title: "Your Location",
          });
          // .catch(err => alert(err))
        } );
    
      //if results OK, run function to place markers for that area
      // placeMarkers(data);
          
  });
}

// function displayErrorToast() {
//   document.addEventListener("DOMContentLoaded", function(event) { 
    
// });
// }








