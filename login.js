var loginObject = new Object();
loginObject.email = $('#email').val();
loginObject.password = $('#password').val();

$('#submit').on('click',function(){
$.ajax ({
    url: "http://www.trailhacks-api.herokuapp.com/users/authenticate",
    type: "POST",
    data: JSON.stringify(loginObject),
    contentType: "application/json",
    success: function(result) {
      console.log('result');
      // window.location.href = "index.html";
    },
    error: function() {
      console.log("error");
    }
});
  });
