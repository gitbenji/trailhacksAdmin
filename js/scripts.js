
L.mapbox.accessToken = 'pk.eyJ1IjoiYnNoYW5rd2l0eiIsImEiOiJjaW14cHA0YTcwM2x2dXdtNGN1dDc5OXN0In0.URoO3IYb5g29cxUykBZ9Aw';
var map = L.mapbox.map('map', 'mapbox.streets')
.setView([30.433832, -84.290650],12);

var marker = L.marker(new L.LatLng(30.445895, -84.218511), {
    icon: L.mapbox.marker.icon({
        'marker-color': 'ff8888'
    }),
    draggable: true
});
marker.bindPopup('This marker is draggable! Move it around.');
marker.addTo(map);


marker.on('click',function(e){
  console.log(e.latlng);
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  fillSidebarLatLng(lat, lng);

});

// fill in the html for latitude and longitude of the sidebar
function fillSidebarLatLng(lat, lng) {
  document.getElementsByClassName('latitude')[0].innerHTML = "Latitude: " + lat;
  document.getElementsByClassName('longitude')[0].innerHTML = "Longitude: " + lng;
}



// grab lat & lon on click
map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    fillSidebarLatLng(lat, lng);

    var marker = L.marker(new L.LatLng(lat, lng), {
        icon: L.mapbox.marker.icon({
            'marker-color': 'ff8888'
        }),
        draggable: true
    });
    marker.bindPopup('This marker is draggable! Move it around.');
    marker.addTo(map);

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


// Sidebar stuff
$('#test-click').on('click', function() {
  $('#sidebar').toggleClass('side-hidden');
});
