const firebaseConfig = {
  apiKey: "AIzaSyD2GV7cZ1Rruux5MwXJ2mh-6goj9nvcx0A",
  authDomain: "mirror-2acca.firebaseapp.com",
  databaseURL: "https://mirror-2acca-default-rtdb.firebaseio.com",
  projectId: "mirror-2acca",
  storageBucket: "mirror-2acca.appspot.com",
  messagingSenderId: "400722412925",
  appId: "1:400722412925:web:f9697d8a6e065489a6b814"
};

// Initialize Firebase 
firebase.initializeApp(firebaseConfig); 

function getData() {
  init()
  var room_name = localStorage.getItem("kwitter_room_name")
  var x = getUrlParameter('id');
  if (typeof x === "undefined") {
  //Nothing
} else {
  if(x !="" && x != true)
    {
    console.log(x);
    room_name = x;
    }
    else
    {
    //Nothing
    }
}
  firebase.database().ref("sites/"+room_name+"/reviews").on('value', function(snapshot) 
	{
		document.getElementById("output").innerHTML = "";
    var num = 600;
    snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {childKey  = childSnapshot.key;
      firebase_message_id = childKey;
      message_data = childData;
      num = num + 84;

      senderName = message_data['name'];
      senderMessage = message_data['message'];
      rating = message_data['rating'];
      name_with_tag = "<h4> "+senderName+"<img class='user_tick' src='../cdn/tick.png'></h4>"
      message_with_tag = "<h4 class='message_h4'>" + senderMessage + "</h4>"
      rating_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + rating + " style='padding-left:15px;padding-right:25px;padding-top:10px;padding-bottom:10px'>"
      span_tag = "<i class='star icon'> "+rating+"</i></button><hr>"
			//Start code
			row = name_with_tag+message_with_tag+rating_button+span_tag;
      console.log(num)

      //var x = num
      //document.getElementById('output').style.top = x.toString() + "px"
			document.getElementById('output').innerHTML += row;
      
			//End code
  	};
	})
  //document.getElementById('output').style.top = num.toString + 'px';
  console.log(document.getElementById('output').style.top)
});
}

function init() {
  var room = localStorage.getItem("kwitter_room_name")
  var x = getUrlParameter('id');
  if (typeof x === "undefined") {
  //Nothing
} else {
  if(x !="" && x != true)
    {
    console.log(x);
    room = x;
    }
    else
    {
    //Nothing
    }
    document.getElementById("desc").innerHTML = localStorage.getItem("website_desc")
    firebase.database().ref('sites/'+room).once('value').then((snapshot) => {
      document.getElementById("desc").innerHTML = snapshot.val().desc
    });
  
  document.getElementById("website_name").innerHTML =  room + "." + localStorage.getItem("website_ex")
}}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'), 
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
};

function send() {
  msg = document.getElementById("msg").value;
  rting = document.getElementById("myRange").value;
  var room_name = localStorage.getItem("kwitter_room_name")
  var x = getUrlParameter('id');
  if (typeof x === "undefined") {
  //Nothing
} else {
  if(x !="" && x != true)
    {
    console.log(x);
    room_name = x;
    }
    else
    {
    //Nothing
    }
}
  user_name = localStorage.getItem("kwitter_username")
  firebase.database().ref("sites/"+room_name+"/reviews").push({
    name : user_name,
    rating : rting,
    message : msg
  });

  document.getElementById("msg").value = "";
}

function updatelike(message_id)
{
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;

  room_name = localStorage.getItem("kwitter_room_name");

  firebase.database().ref("/"+room_name).child(message_id).update({
    likes: updated_likes
  });
}

function logout()
{
	localStorage.removeItem('kwitter_username');
	localStorage.removeItem('kwitter_room_name');
  window.location.assign("../?redirect=logout")
}

