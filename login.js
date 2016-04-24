

$('#submit').on('click',function(){
  var loginObject = new Object();
  loginObject.email = $('#email').val();
  loginObject.password = $('#password').val();
$.ajax ({
    url: "http://www.trailhacks-api.herokuapp.com/users/authenticate",
    type: "POST",
    data: JSON.stringify(loginObject),
    dataType: "jsonp",
    success: function(result) {
      console.log('result');
      // window.location.href = "index.html";
    },
    error: function() {
      console.log("error");
    }
});
  });
