
// to be filled with GET request
var markerArr = [];
var activeMarker;
var i = markerArr.length;

L.mapbox.accessToken = 'pk.eyJ1IjoiYnNoYW5rd2l0eiIsImEiOiJjaW14cHA0YTcwM2x2dXdtNGN1dDc5OXN0In0.URoO3IYb5g29cxUykBZ9Aw';
var map = L.mapbox.map('map', 'mapbox.streets')
.setView([30.433832, -84.290650],12);

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

      fillSidebar(markerObject);
    });

    $('#sidebar').removeClass('side-hidden');
});



$('#button').on('click', function() {

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


  // $.ajax ({
  // 		url: "trailhacks-api.herokuapp.com",
  // 		type: "POST",
  // 		data: JSON.stringify(markerObject),
  // 		contentType: "application/json",
  // 		success: function(result) {
  // 			console.log(result);
  // 		},
  // 		error: function() {
  // 			console.log("error");
  // 		}
  // 	});
});

// $(document).ready(function() {
//   // Sidebar stuff
//   $('#test-click').on('click', function() {
//     $('#sidebar').toggleClass('side-hidden');
//   });
//
// });
