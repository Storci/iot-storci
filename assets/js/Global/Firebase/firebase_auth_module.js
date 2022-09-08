// These samples are intended for Web so this import would normally be
// done in HTML however using modules here is more convenient for
// ensuring sample correctness offline.
//import firebase from "firebase/app";

// Effettua il login di utente già registrato
async function signInWithEmailPassword(email, password) {
	return new Promise(function(resolve, reject){
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user   => resolve(user))
		.catch(error => reject(error))
	})
}

// Effettua la registrazione di un nuovo utente
function signUpWithEmailPassword(email, password, baseURL) {
	// [START auth_signup_password]
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(() =>{})
	.catch((error) => {
		let errorCode = error.code
		let errorMessage = error.message
		let errorMail = error.code
		let errorMailMessage = error.message

		$('#IDErrorMessage').css("display", "block")
		$('#IDErrorMessage').text('code: ' + errorCode + ' - ' + errorMessage)

		// effettuare un controllo se la mail esiste gia in firebase
		if(errorMail == "auth/email-already-in-use"){
			$("#signUpfailed").fadeIn(1500);
			console.log(errorMail)
		}
	})
}

function sendEmailVerification() {
	// [START auth_send_email_verification]
	firebase.auth().currentUser.sendEmailVerification()
	.then(() => {
		// Email verification sent!
		// ...
	});
	// [END auth_send_email_verification]
}

function sendPasswordReset() {
	const email = "sam@example.com";
	// [START auth_send_password_reset]
	firebase.auth().sendPasswordResetEmail(email)
	.then(() => {
		// Password reset email sent!
		// ..
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		// ..
	});
	// [END auth_send_password_reset]
}

function signOut(){
	// [START signOut]
	firebase.auth().signOut().then(() => {
		// Sign-out successful.
		console.info("Utente disconnesso");
			///window.location.href = './90_signIn.html'
	}).catch((error) => {
		// An error happened.
		console.error(error);
	});
	// [END signOut]
}


async function onAuthStateChanged(){
	return new Promise(function(resolve, reject){
		firebase.auth().onAuthStateChanged(user => resolve(user))
	})
}


function onAuthStateChanged_2(){
	firebase.auth().onAuthStateChanged((user) => {
		//console.log(user)
  	if(!user){
			let pageURL = window.location.href
			localStorage.setItem('urlPage', pageURL)
			window.location.href = './90_signIn.html'
		}
		localStorage.setItem('user', user)
	})
}

function setPersistenceSession() {
  var email = "...";
  var password = "...";

  // [START auth_set_persistence_session]
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      //return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_set_persistence_session]
}

function setPersistenceNone() {
  // [START auth_set_persistence_none]
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
    .then(() => {
      var provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      return firebase.auth().signInWithRedirect(provider);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_set_persistence_none]
}


/*function userUpdatePassword(user, newPassword){
	user.updatePassword(newPassword).then(() =>
	{
		console.log("ok")
		// Update successful.
	  }).catch((error) => {
		console.warn(error)
		// ...
	  });
}*/

/*function changePassword(user, credential, newPassword){
	user.reauthenticateWithCredential(credential).then(() => {
		// User re-authenticated.
		console.log(newPassword)
		user.updatePassword(newPassword).then(() =>
	{
		alert("Password Successfully updated")

	  });
	  }).catch((error) => {
		// An error ocurred
		// ...
	  });
}*/

/*function getUserData(email) {
	let dbUser = firebase.firestore();
	dbUser.collection('users').get(email).then((snapshot) =>{
		snapshot.docs.forEach(doc =>{
			console.log(doc.data())
		})
	 })
}*/


/*function getUserData(email, pass){
	firebase.auth().createUserWithEmailAndPassword(email)
	.then((userCredential) =>{
		let db = firebase.firestore();
		db.collection('users').doc(userCredential.user.email).get( {
			firstName : signUpForm['display_name'].value,
            lastName : signUpForm['display_lastname'].value,
            phoneNumber : signUpForm['display_country'].value,
            Countries : signUpForm['display_telephone'].value,
			companyName: signUpForm['display_company'].value
		})
	})
}
*/

/*function getUserData(){
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
		  // User is signed in, see docs for a list of available properties
		  // https://firebase.google.com/docs/reference/js/firebase.User
		  var firstName = user.firstName;

		  // ...
		} else {
		  // User is signed out
		  // ...
		}
	  });
}*/

export {
	signInWithEmailPassword,
	signUpWithEmailPassword,
	sendEmailVerification,
	sendPasswordReset,
	signOut,
	onAuthStateChanged,
	setPersistenceSession,
	setPersistenceNone,
	onAuthStateChanged_2,
	//userUpdatePassword,
	//changePassword
	//getUserData

};
