const firebaseConfig = {
	apiKey: "AIzaSyCi9rsoRJogatOKu_XT7VA1H26Ccv4Y4uQ",
	authDomain: "chimm-4b7b0.firebaseapp.com",
	databaseURL: "https://chimm-4b7b0-default-rtdb.firebaseio.com",
	projectId: "chimm-4b7b0",
	storageBucket: "chimm-4b7b0.appspot.com",
	messagingSenderId: "807500885561",
	appId: "1:807500885561:web:34973c28f4717935f7e7e8",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

const sign_in = document.getElementById("sign_in_form");

sign_in.addEventListener("submit", (e) => {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	auth
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			var user = auth.currentUser;

			var database_ref = database.ref();

			var user_data = {
				last_login: Date.now(),
			};

			database_ref.child("users/" + user.uid).update(user_data);

			var realtime_user_data = database_ref.child("users/" + user.uid);
			// localStorage.setItem("user", JSON.stringify(realtime_user_data));

			realtime_user_data
				.get()
				.then((snapshot) => {
					if (snapshot.exists()) {
						console.log(snapshot.val());
						localStorage.setItem("user", JSON.stringify(snapshot.val()));
					} else {
						console.log("No data available");
					}
				})
				.catch((error) => {
					console.error(error);
				});

			alert("Signed In successfully");

			setTimeout(() => {
				sign_in.reset();
			}, 500);

			setTimeout(() => {
				window.location.href = "/html/profile.html";
			}, 1000);
		})
		.catch((error) => {
			var error_code = error.code;
			var error_message = error.message;
			alert(error_code + " " + error_message);
		});
});