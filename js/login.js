L.mapbox.accessToken = 'pk.eyJ1IjoiYnNoYW5rd2l0eiIsImEiOiJjaW14cHA0YTcwM2x2dXdtNGN1dDc5OXN0In0.URoO3IYb5g29cxUykBZ9Aw';
var map = L.mapbox.map('map', 'mapbox.streets')
.setView([30.433832, -84.290650], 12);


$('#submit').on('click',function(){
  var loginObject = new Object();
  loginObject.email = $('#email').val();
  loginObject.password = $('#password').val();
$.ajax ({
    url: "http://localhost:3000/user/authenticate",
    type: "POST",
    data: loginObject,
    success: function(result) {
      var authtoken = result.auth_token;
      sessionStorage.setItem('authtoken', authtoken);
      window.location.href = "index.html";
    },
    error: function() {
      console.log("error");
    }
});
  });
