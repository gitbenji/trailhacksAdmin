
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
  var iconArr = $('.hazards');
  for(var j=0; j<iconArr.length; j++) {
    iconArr[j].checked = false;
  }

  // checks selected hazards
  var hazardArr = markerObject.hazardArr;
  console.log(hazardArr);

  for(var j=0; j<hazardArr.length; j++) {
    console.log(hazardArr[j])
    for(var h=0; h<$('.hazards').length; h++){
      var id = $('.hazards')[h].id;
      if ($('.hazards')[h].id == hazardArr[j]) {
        $('#' + id).prop("checked", true);
      }
    }
  }
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
    markerObject.hazardArr = [];
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
  var hazard;

  var hazardElementArr = ($('input.hazards:checkbox:checked'));

  for(var j=0; j<hazardElementArr.length; j++) {
    hazard = hazardElementArr[j].value;
    hazardArr.push(hazard);
    console.log(hazardArr);
  }

  // hazardElementArr.forEach(function(hazardElement) {
  //   hazardArr.push(hazardElement.val());
  //   console.log(hazardArr)
  // });

  var markerObject = markerArr[activeMarker];

  markerObject.markerName = $("#markerName").val();
  markerObject.trailName = $("#trailName").val();
  markerObject.loopName = $("#loopName").val();
  markerObject.lat = $("#latitude").val();
  markerObject.lng = $("#longitude").val();
  markerObject.summaryVal = $("#summary").val();
  markerObject.hazardArr = hazardArr;

  markerArr[activeMarker] =  markerObject;
  console.log(markerObject);
  console.log(markerArr);

  flipUI();
  isFlipped = false;
});
