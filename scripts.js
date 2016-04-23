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
