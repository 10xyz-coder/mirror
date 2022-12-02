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
	firebase.database().ref("/rooms/").on('value', function(snapshot) 
	{
		document.getElementById("output").innerHTML = "";
		snapshot.forEach(function(childSnapshot) 
		{childKey  = childSnapshot.key;
			Room_names = childKey;
			//Start code
			console.log("Room - " + Room_names)
			row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoom(this.id)' > #" + Room_names + "</div> <hr>"
			document.getElementById('output').innerHTML += row;
			//End code
  	});
	})
;}
//getData();

function bodyOnLoad()
{
	username = localStorage.getItem("kwitter_username");
	document.getElementById('username').innerHTML = "Welcome " + username + "!";
}

function redirectToRoom(name) 
{
	console.log(name)
	localStorage.setItem('kwitter_room_name', name)
	window.location.assign("/view/?id="+room_name+"&extension="+extension);
}

function logout()
{
	localStorage.removeItem('kwitter_username');
	localStorage.removeItem('kwitter_room_name');
	firebase.auth().signOut().then(() => {
		// Sign-out successful.
		window.location.assign("../?redirect=logout")
	}).catch((error) => {
		// An error happened.
		console.log(error)
	});
}

function goToRoom() {
	room_name = document.getElementById('room_name').value
	extension = document.getElementById('ext').value

	localStorage.setItem('kwitter_room_name', room_name);

	redirectToRoom(room_name)
}

function room() {
	room_name = document.getElementById('room_name').value
	Extension = document.getElementById('ext').value
	firebase.database().ref("sites/"+room_name).on('value', function(snapshot) {
		if (snapshot.exists()) {
			 goToRoom();
			 return;
		}
		else {
			description = prompt("Please enter a description for this website", "(This is a website where you can order cakes, This website allows voice calls)")
	localStorage.setItem("website_desc", description)
	localStorage.setItem("website_ex", Extension)

	firebase.database().ref("sites/"+room_name).set(
		{
			rating: 0,
			reviews: 0,
			desc: description,
			extension: Extension
		}, (error) => {
			if (error) {
				console.log(error)
			} else {
				// Data saved successfully!
				localStorage.setItem('kwitter_room_name', room_name);
				window.location.assign("/mirror/view/?id="+room_name+"&extension="+Extension);
			}
		
		});
		}
 });
}

function addRoom()
{
	room_name = document.getElementById('room_name').value
	Extension = document.getElementById('ext').value
	firebase.database().ref("sites/"+room_name).on('value', function(snapshot) {
		if (snapshot.exists())
			 goToRoom();
			 return;
 });
	description = prompt("Please enter a description for this website", "(This is a website where you can order cakes, This website allows voice calls)")
	localStorage.setItem("website_desc", description)
	localStorage.setItem("website_ex", Extension)

	firebase.database().ref("sites/"+room_name).set(
		{
			rating: 0,
			reviews: 0,
			desc: description,
			extension: Extension
		}, (error) => {
			if (error) {
				console.log(error)
			} else {
				// Data saved successfully!
				localStorage.setItem('kwitter_room_name', room_name);
				window.location.assign("/mirror/view/?id="+room_name+"&extension="+Extension);
			}
		
		});

	

}
