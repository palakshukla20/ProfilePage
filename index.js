$(document).ready(function() {
  $("#navbar").load("index.html #header");
  $("#body-nav").load("index.html #body-right-nav");
})

function isLogout() {
  localStorage.removeItem("email");
  window.location.href = '/login.html';
  alert("you are logout");
}

function load(e, id) {
  $(".profile-inner-nav-list li").removeClass("active") 
  console.log(('#'+ id))
  $('#'+ id).addClass("active"); 
  var object = {}
  var getUsersData = JSON.parse(localStorage.getItem("Users"))
  var currentUser = localStorage.getItem("email")
  
  $.each(getUsersData, function(key, val) {
    console.log(typeof val)
    if (currentUser === val.email) {  
      console.log(val)
      var result = []
      result.push(val)
      object["result"] = result;
      var template = $('#template').html();
      var text = Mustache.render(template, object);
      $("#load-template").html(text);
    }
  })
}


$('#submitForm').on('click', function() {
  if ($("#password1").val() === $("#password2").val()) {
    var registerData = JSON.parse(localStorage.getItem("Users"));
    var userData = { name : $("#name").val(),
    email: $("#emailLogin").val(),
    password: $("#password1").val(),
    birthdate: $("#date").val(),
    location: $("#location").val()};

    registerData.push(userData);
    console.log(registerData)
    localStorage.setItem('Users', JSON.stringify(registerData));
    alert("Form Submitted Succesfully");
  } 
})

$('#login').on('click', function() {
  localStorage.removeItem("email");
  var registerUser = JSON.parse(localStorage.getItem('Users')); 
  var logUserEmail = $("#email").val();
  var logUserPassword = $("#password").val();
  console.log(registerUser)
  $.each(registerUser, function(key, val) {  
    if(logUserEmail === val.email && logUserPassword == val.password) {
      localStorage.setItem("email", logUserEmail)
      $('#login-form').attr('action', 'timeline.html')
    } 
  })
})

function updateData(){
  var currentUser = localStorage.getItem('email');
  var currentUserData = JSON.parse(localStorage.getItem('Users')); 
  $.each(currentUserData, function(key, val) {
    if (currentUser === val.email) {
      console.log(val.name)
      val.name = ($("#name").val().length )== 0 ? val.name = val.name :  val.name = val.name = $("#name").val();
      console.log(val.name)
    }
  })
}

function addFriend() {
  var currentUser = localStorage.getItem('email');
  var currentUserData = JSON.parse(localStorage.getItem('Users')); 
  $.each(currentUserData, function(key, val) {
    if (currentUser !== val.email) {
      a = "<a>`{{val.name}}` </a>"
      $('follow-card').append(a)
    }
  })
}

function getCurrentUser() {
  var currentUser = localStorage.getItem('email');
  var currentUserData = JSON.parse(localStorage.getItem('Users')); 
  $.each(currentUserData, function(key, val) {
    if (currentUser === val.email) {
      return (val, currentUser)
    }
  })
}