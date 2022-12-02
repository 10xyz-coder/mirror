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

function addUser()
{
  var name = document.getElementById("username").value;
  var email =document.getElementById('email').value;
  var password = document.getElementById("passc").value

  console.log(name);

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var User = firebase.auth().currentUser;
    console.log(User)
    firebase.database().ref("users/"+User.uid).on('value', function(snapshot) {
      if (snapshot.exists()) {
         var theName = snapshot.val().username;
         localStorage.setItem("kwitter_username", theName);
         window.location.pathname = "/mirror/room/";
      }
  })
})
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    wrongPass()
  });
}

function signUser()
{
  var Uname = document.getElementById("username").value;
  var email =document.getElementById('email').value;
  var password = document.getElementById("passc").value

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = firebase.auth().currentUser;

    firebase.database().ref("users/"+user.uid).set(
      {
        username: Uname,
      }, (error) => {
        if (error) {
          console.log(error)
        } else {
          // Data saved successfully!
          localStorage.setItem('kwitter_username', Uname);
          window.location.assign("/mirror/room");
        }
      
      });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
    // ..
  });
}

function wrongPass() {
  var element = document.getElementById("err_msg");
  element.classList.remove("hidden");
}

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

function bodyOnLoad() {
var x = getUrlParameter('redirect');
document.getElementById('join').innerHTML = "Join Mirror today";

if (typeof x === "undefined") {
  //Nothing
} else {
    if(x !="" && x != true)
    {
    console.log(x)
    document.getElementById('join').innerHTML = "Login back to Mirror";
    }
    else
    {
    //Nothing
    }
}
}