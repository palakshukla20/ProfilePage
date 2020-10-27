function isLogout() {
  localStorage.removeItem("email");
  window.location.href = '/login.html';
  alert("you are logout");
}

function load(e, id) {
  if (localStorage.getItem("email") == null) { 
    window.location.href = '/login.html';
  }
  var object = {}
  var getUsersData = JSON.parse(localStorage.getItem("user"))
  var currentUser = localStorage.getItem("email")
  
  $.each(getUsersData, function(key, val) {
    if (currentUser === val.email) {  
      var result = []
      result.push(val)
      object["result"] = result;
      object["post"] = val.post;
      object["friend"] = val.friend;
      object["photo"] = val.photo;
      var template = $('#template').html();
      var text = Mustache.render(template, object);
      $("#load-template").html(text);
      $("#navbar").load("index.html #header");
      $("#body-nav").load("index.html #body-right-nav");
      $("#profile-card").load("index.html .profile-card")
      $('#' + id).addClass('active').siblings().removeClass('active');
    }
  })
}

$('#submitForm').on('click', function() {
  if ($("#password1").val() === $("#password2").val()) {
    var registerData = JSON.parse(localStorage.getItem("user"));
    var userData = { name : $("#name").val(),
    email: $("#emailLogin").val(),
    password: $("#password1").val(),
    birthdate: $("#date").val(),
    location: $("#location").val(),
    defaultImage: "default-profile-picture.jpg",
    post: [],
    friend: [],
    allfriend: [],
    photo: [] };
    registerData.push(userData);
    console.log(registerData)
    localStorage.setItem('user', JSON.stringify(registerData));
    alert("Form Submitted Succesfully");
  } 
})

$('#login').on('click', function() {
  localStorage.removeItem("email");
  var registerUser = JSON.parse(localStorage.getItem('user')); 
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

function updateData() {
  var currentUser = localStorage.getItem('email');
  var currentUserData = JSON.parse(localStorage.getItem('user')); 
  for (var i = 0; i < currentUserData.length; i++) {
    if(currentUser === currentUserData[i].email) { 
      var genderData = $("input:radio[name=gender]:checked").val();
      var statusData = $("input:radio[name=status]:checked").val()
      currentUserData[i].name = $("#name").val();
      currentUserData[i].title = $("#title").val();
      currentUserData[i].date =  ($("#date").val()).toLocaleString(); 
      currentUserData[i].location = $("#location").val(); 
      currentUserData[i].gender = genderData == null ? currentUserData[i].gender =  currentUserData[i].gender : currentUserData[i].gender = genderData ; 
      currentUserData[i].status = statusData== null ? currentUserData[i].status =  currentUserData[i].status : currentUserData[i].status = statusData;
      currentUserData[i].occupation = $("#occupation").val();
      currentUserData[i].job = $("#job").val();
      currentUserData[i].skill = $("#skill").val();
      var imagePath = $("#profile-image").val()
      imagePath = imagePath.replace(/^.*\\/, "")
      currentUserData[i].profileImage = 
      $("#profile-image").val().length == 0 ? currentUserData[i].profileImage = currentUserData[i].profileImage : 
      currentUserData[i].profileImage = imagePath;
      window.location.reload();  
      break; 
    }
  }
  localStorage.setItem("user", JSON.stringify(currentUserData)); 
}

function getUserPrevInfo() {
  var currentUser = localStorage.getItem('email');
  var currentUserData = JSON.parse(localStorage.getItem('user')); 
  for (var i = 0; i < currentUserData.length; i++) {
    if(currentUser === currentUserData[i].email) {   
      $("#name").val(currentUserData[i].name); 
      $("#title").val(currentUserData[i].title); 
      $("#date").val(currentUserData[i].date); 
      $("#location").val(currentUserData[i].location); 
      $("#gender").val(currentUserData[i].gender); 
      $("#status").val(currentUserData[i].gender); 
      $('#occupation').val(currentUserData[i].occupation);
      $('#job').val(currentUserData[i].job); 
      $('#skill').val(currentUserData[i].skill);
      break; 
    }
  }
}

function addPost() {
  var currentUser = localStorage.getItem('email'); 
  var currentUserData = JSON.parse(localStorage.getItem('user')); 
  for (var i = 0; i < currentUserData.length; i++) {
    if(currentUser === currentUserData[i].email) { 
      var object = {};
      var imagePath = $("#post-image").val();
      imagePath = imagePath.replace(/^.*\\/, "");
      object["postImage"] = imagePath;
      currentUserData[i].photo = imagePath
      object["postText"] = $("#post-text").val();
      object["date"] = new Date().toLocaleString()
      currentUserData[i].post.unshift(object);
      console.log(currentUserData[i].post)
      window.location.reload(); 
      break;
    }
  }
  localStorage.setItem("user", JSON.stringify(currentUserData)); 
  countActivity()
}

function getFriendDetail(getNewfriend) {
  var currentUserData = JSON.parse(localStorage.getItem('user')); 
  for (var i = 0; i < currentUserData.length; i++) {
    if(getNewfriend === currentUserData[i].email) {   
     object = {}
     console.log(currentUserData[i].name)
     console.log(currentUserData[i].job)
     object["friendName"] = currentUserData[i].name;
     object["friendJob"] = currentUserData[i].job;
     object["friendImage"] = currentUserData[i].profileImage;
     return object
    }
  }
}

function showfriend() {
  $('.follow-card').css('display', 'block')
  var friend = [];
  var obj = {};
  var currentUser = localStorage.getItem('email');
  var currentUserData = JSON.parse(localStorage.getItem('user')); 
  $.each(currentUserData, function(key, val) {
    if (currentUser !== val.email) {
      object = {};
      object["name"] = val.name;
      object["title"] = val.title;
      object["email"] = val.email;
      friend.unshift(object)
    }
  obj["add-friend"] = friend
  var template = $("#friend-template").html();
  text =  Mustache.render(template, obj);
  $(".add-friend").html(text)
  })
}


function addNewFriend(e) {
  var getNewfriend = $(e).attr("id");
  var currentUser = localStorage.getItem("email");
  var currentUserData = JSON.parse(localStorage.getItem("user")); 
  for (var i = 0; i < currentUserData.length; i++) {
    if(currentUser === currentUserData[i].email) {   
      if (currentUserData[i].allfriend != null && currentUserData[i].allfriend.includes(getNewfriend)) {
        alert("Already you Both are Friend");
      }  else {
        console.log(getNewfriend,  currentUserData[i])
        currentUserData[i].allfriend.push(getNewfriend);
        currentUserData[i].friend.push(getFriendDetail(getNewfriend));
        currentUserData[i].following = (currentUserData[i].friend).length
        alert("congratulations Now You Both are Friend");
      }
    }
  }
  console.log(currentUserData)
  localStorage.setItem("user", JSON.stringify(currentUserData)); 
  window.load()
}

function countActivity () {
  var currentUser = localStorage.getItem("email");
  var currentUserData = JSON.parse(localStorage.getItem("user")); 
  for (var i = 0; i < currentUserData.length; i++) {
    if(currentUser === currentUserData[i].email) {   
      currentUserData[i].activity = (currentUserData[i].post).length;
    }
  }
  localStorage.setItem("user", JSON.stringify(currentUserData)); 
}

function addPhoto() {
  var currentUser = localStorage.getItem("email");
  var currentUserData = JSON.parse(localStorage.getItem("user")); 
  for (var i = 0; i < currentUserData.length; i++) {
    if(currentUser === currentUserData[i].email) {   
      var imagePath = $("#photo").val();
      object = {}
      object[photoUrl] = imagePath
      imagePath = imagePath.replace(/^.*\\/, "");
      currentUserData[i].photo.push(imagePath);
    }
  }
  localStorage.setItem("user", JSON.stringify(currentUserData)); 
  window.load()
}

function getCurrentUser() {
  var currentUser = localStorage.getItem("email");
  var currentUserData = JSON.parse(localStorage.getItem("user")); 
  $.each(currentUserData, function(key, val) {
    if (currentUser === val.email) {
      return (val, currentUser)
    }
  })
}