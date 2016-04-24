

$('#submit').on('click',function(){
  var loginObject = new Object();
  loginObject.email = $('#email').val();
  loginObject.password = $('#password').val();
  console.log('click');
  $.ajax ({
      url: "https://trailhacks-api.herokuapp.com/users",
      crossDomain: true,
      type: "POST",
      data: JSON.stringify(loginObject),
      dataType: "json",
      contentType: "application/json",
      success: function(result) {
        console.log(result);
        window.location.href = "index.html";
      },
      error: function() {
        console.log("error");
      }
  });
});
