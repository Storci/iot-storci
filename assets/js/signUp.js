// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"

import * as common from "./Global/Common/commonFunctions.js"

let baseURL = window.location.protocol + "//" + window.location.host

// Nasconde il messaggio di errore nel momento in cui digito qualcosa di diverso nei vari campi
$('.form-control').on('input', function(){
  $('#IDErrorMessage').css("display", "none")
})

$("#IDEmail").keyup(function(){
  let email = $(this).val()
  // Criteri di controllo per il campo new password
  // Criteri di controllo per il campo old password
  switch(true){
    case email == "": $("#IDEmail").addClass("is-invalid").removeClass("is-valid"); break;
    case !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/): $("#IDEmail").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#IDEmail").addClass("is-valid").removeClass("is-invalid"); break;
  }
})
$("#IDEmail_repeat").keyup(function(){
  let email_confirm = $(this).val()
  let email = $("#IDEmail").val()
  // Criteri di controllo per il campo new password
  // Criteri di controllo per il campo old password
  switch(true){
    case email_confirm == "": $("#IDEmail_repeat").addClass("is-invalid").removeClass("is-valid"); break;
    case email_confirm != email : $("#IDEmail_repeat").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#IDEmail_repeat").addClass("is-valid").removeClass("is-invalid"); break;
  }
})
$("#IDPassword").keyup(function(){
  let newPassword = $(this).val()
  let status_new_Password = $(this).val()
  // Criteri di controllo per il campo new password
  switch(true){
    case newPassword == "": $("#invalid-mess-11").text("Please, insert your new password."); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case newPassword.length < 8: $("#invalid-mess-11").text("Attention, password must be long of 8 characters"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case newPassword.length > 20: $("#invalid-mess-11").text("Attention, password must be short of 20 characters"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[a-z]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a low character"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[0-9]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a number"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[A-Z]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a up character"); $("#IDPassword").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#IDPassword").addClass("is-valid").removeClass("is-invalid"); status_new_Password = true; break;
  }
})
$("#IDPassword_repeat").keyup(function(){
  let newPassword = $("#IDPassword").val()
  let confirmPassword = $(this).val()
  // Criteri di controllo per il campo new password
  // Criteri di controllo per il campo confirm password
  switch(true){
    case confirmPassword == "": $("#invalid-mess-12").text("Please, confirm your new password."); $("#IDPassword_repeat").addClass("is-invalid").removeClass("is-valid"); break;
    case confirmPassword !== newPassword: $("#invalid-mess-12").text("Attention, the passwords not match"); $("#IDPassword_repeat").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#IDPassword_repeat").addClass("is-valid").removeClass("is-invalid"); status_confirm_Password = true; break;
  }
})

// Function to handle fingerprint registration
async function handleFingerprintRegistration(e) {
  e.preventDefault(); // Prevent default form submission behavior

  const email = $("#IDEmail").val();
  const name = $("#IDName").val() + " " + $("#IDLastName").val();

  // Generate registration options
  const response = await fetch('http://localhost:3000/generate-registration-options', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
  }

  const options = await response.json();

  // Ensure the challenge is correctly set
  if (!options.challenge) {
    throw new Error('Challenge is missing in the registration options');
  }

  // Convert the challenge from base64 to Uint8Array
  options.challenge = Uint8Array.from(atob(options.challenge), c => c.charCodeAt(0));

  // Convert user ID from base64 to Uint8Array
  options.user.id = Uint8Array.from(atob(options.user.id), c => c.charCodeAt(0));

  // Convert excludeCredentials ID from base64 to Uint8Array
  if (options.excludeCredentials) {
    options.excludeCredentials = options.excludeCredentials.map(cred => ({
      ...cred,
      id: Uint8Array.from(atob(cred.id), c => c.charCodeAt(0)),
    }));
  }

  // Create a new credential
  const credential = await navigator.credentials.create({ publicKey: options });

  // Send the credential to the server for verification
  const verificationResponse = await fetch('http://localhost:3000/verify-registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, attestationResponse: credential }),
  });

  if (!verificationResponse.ok) {
    const errorText = await verificationResponse.text();
    throw new Error(`HTTP error! status: ${verificationResponse.status}, response: ${errorText}`);
  }

  const verificationResult = await verificationResponse.json();

  if (verificationResult.verified) {
    console.log("Fingerprint registration successful");
    return true;
  } else {
    throw new Error("Fingerprint registration failed");
  }
}

// Function to handle normal user registration
async function handleNormalUserRegistration(e) {
  e.preventDefault(); // Prevent default form submission behavior

  try {
    const email = $("#IDEmail").val();
    const password = $("#IDPassword").val();
    const name = $("#IDName").val() + " " + $("#IDLastName").val();

    // Perform normal user registration (e.g., save to database, etc.)
    // This is a placeholder for your normal registration logic
    console.log("Normal user registration successful");
    $("#signUpSuccess").css("display", "block");
  } catch (error) {
    console.error(error);
    $('#IDErrorMessageSignUp').css("display", "block");
    $('#IDErrorMessageSignUp').text(error.message);
  }
}

// Add event listener to the normal registration button
document.getElementById("IDButtonSignUp").addEventListener("click", handleNormalUserRegistration);

// Add event listener to the fingerprint registration button
document.getElementById("IDButtonFingerprintRegister").addEventListener("click", handleFingerprintRegistration);

// URL per chiamata REST API per ottenere la lista dei paesi
const url = "https://restcountries.com/v2/all";

// la funzione che ottiene la lista dei paesi and aggiornare il dropdown
async function fetchCountries() {
    try {
        // fare una richiesta get utilizzando la parola API FETCH
        const response = await fetch(url);
        
        // Check if the response is OK (status code 200-299) controllare se la risposta ricevuta è OK 200
        if (!response.ok) {
            throw new Error('risposto è andata a buon fine ' + response.statusText);
        }
        
        // fare un parse alla risposta ricevuto in un JSON
        const countries = await response.json();

        // attraverso il for genero l'elemento option in base alla lunghezza
        let results = '<option value="-1">Please Select a Country or State</option>';
        for (let i = 0; i < countries.length; i++) {
            results += `<option>${countries[i].name}</option>`;
        }

        // Update the select element with the new options aggiorna l'elemento selezionato con  le nuove opzioni 
        document.getElementById("IDCountries").innerHTML = results;
        
        // un console log per visualizzare i paesi
        console.log(countries);
    } catch (error) {
        // un exception in caso di un errore
        console.error('operazione in errore:', error);
    }
}
// Call the function to fetch and display the countries
fetchCountries();