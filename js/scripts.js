
// to be filled with GET request
var markerArr = [];
var i = markerArr.length;

L.mapbox.accessToken = 'pk.eyJ1IjoiYnNoYW5rd2l0eiIsImEiOiJjaW14cHA0YTcwM2x2dXdtNGN1dDc5OXN0In0.URoO3IYb5g29cxUykBZ9Aw';
var map = L.mapbox.map('map', 'mapbox.streets')
.setView([30.433832, -84.290650],12);

// fill in the html for latitude and longitude of the sidebar
function fillSidebarLatLng(lat, lng) {
  document.getElementsByClassName('latitude')[0].innerHTML = "Latitude: " + lat;
  document.getElementsByClassName('longitude')[0].innerHTML = "Longitude: " + lng;
}


// function fillSidebarNames()
// document.getElementsByClassName('markerName')[0].innerHTML =


function createMarker (lat,lng){
  var markerVar = L.marker(new L.LatLng(lat, lng), {
      icon: L.mapbox.marker.icon({
          'marker-color': 'ff8888'
      }),
      draggable: true
  });
  markerVar.bindPopup('This marker is draggable! Move it around.');
  markerVar.addTo(map);


  markerVar.id = i;
  i++;


  return markerVar;
}

// grab lat & lon on click
map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;


    fillSidebarLatLng(lat, lng);

    var markerVar = createMarker(lat, lng);
    var markerObject = new Object();
    markerObject.markerName = $("#markerName").val();
    markerObject.trailName = $("#trailName").val();
    markerObject.loopName = $("#loopName").val();
    markerObject.lat = e.latlng.lat;
    markerObject.lng = e.latlng.lng;
    markerObject.summaryVal = $("#summary").val();
    console.log(markerObject);

    markerArr.push(markerObject);
    markerVar.on('click', function(e) {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      var index = e.target.id;
      var markerObject = markerArr[index];
      console.log(markerObject);
      fillSidebarLatLng(lat, lng);
    });

    $('#sidebar').removeClass('side-hidden');
});



$('#button').on('click', function() {
  var summaryVal = $('#summary').val();

  $.ajax('http://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    data: {
      title: 'foo',
      body: summaryVal,
      userId: 1
    }
  }).then(function(data) {
    console.log(data);
  });

});

$(document).ready(function() {
  // Sidebar stuff
  $('#test-click').on('click', function() {
    $('#sidebar').toggleClass('side-hidden');
  });

});
