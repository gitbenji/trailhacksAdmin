
// to be filled with GET request
var markerArr = [];
var activeMarker;
var i = markerArr.length;
var isFlipped = false;

L.mapbox.accessToken = 'pk.eyJ1IjoiYnNoYW5rd2l0eiIsImEiOiJjaW14cHA0YTcwM2x2dXdtNGN1dDc5OXN0In0.URoO3IYb5g29cxUykBZ9Aw';
var map = L.mapbox.map('map', 'mapbox.streets')
.setView([30.433832, -84.290650], 12);

// fill in the input values of the sidebar
function fillSidebar(markerObject) {
  $('#markerName').val(markerObject.markerName);
  $('#trailName').val(markerObject.trailName);
  $('#latitude').val(markerObject.lat);
  $('#longitude').val(markerObject.lng);
  $('#summary').val(markerObject.summaryVal);
}

function fillSidebarLatLng(lat, lng) {
  $('#latitude').val(lat);
  $('#longitude').val(lng);
}

function createMarker(lat,lng) {
  var markerVar = L.marker(new L.LatLng(lat, lng), {
      icon: L.mapbox.marker.icon({
          'marker-color': 'ff8888'
      }),
      draggable: true
  });
  // markerVar.bindPopup('poop');
  markerVar.addTo(map);

  markerVar.id = i;
  i++;

  return markerVar;
}

function flipUI() {
  $('#sidebar').toggleClass('side-flip');
  $('#map').toggleClass('map-flip');
}

// grab lat & lon on click
map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;

    fillSidebarLatLng(lat, lng);

    var markerVar = createMarker(lat, lng);
    activeMarker = markerVar.id;
    var markerObject = new Object();
    markerObject.lat = lat;
    markerObject.lng = lng;
    markerArr.push(markerObject);

    fillSidebar(markerObject);

    markerVar.on('click', function(e) {
      //active marker updates to id of click marker
      activeMarker = e.target.id;

      var markerObject = markerArr[activeMarker];
      console.log(activeMarker, markerObject);

      if (!isFlipped) {
        flipUI();
        isFlipped = true;
      }

      fillSidebar(markerObject);
    });

    if (!isFlipped) {
      flipUI();
      isFlipped = true;
    }
});

$('#exitSide').on('click', function() {
  flipUI();
  isFlipped = false;
});

$('#submitMarker').on('click', function() {

  var hazardArr = [];

  console.log($('input.hazards:checkbox:checked'));

  var hazardElementArr = $('input.hazards:checkbox:checked');
  console.log(hazardElementArr);

  var markerObject = markerArr[activeMarker];
  console.log(activeMarker, markerObject);

  markerObject.markerName = $("#markerName").val();
  markerObject.trailName = $("#trailName").val();
  markerObject.loopName = $("#loopName").val();
  markerObject.lat = $("#latitude").val();
  markerObject.lng = $("#longitude").val();
  markerObject.summaryVal = $("#summary").val();

  markerArr[activeMarker] =  markerObject;
  console.log(markerObject);
  console.log(markerArr);

  flipUI();
  isFlipped = false;
});
