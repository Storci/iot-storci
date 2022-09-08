// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"

import * as common from "./Global/Common/commonFunctions.js"

let baseURL = window.location.protocol + "//" + window.location.host

// Nasconde il messaggio di errore nel momento in cui digito qualcosa di diverso nei vari campi
$('.form-control').on('input', function(){
  $('#IDErrorMessage').css("display", "none")
})

// Funzione scatenata dalla pressione del pulsante di sign up
$('#IDButtonSignUp').click(function(){
  let email = $('#IDEmail').val()
  let customerCode = $('#Unique').val()

  // Controlla che l'email non sia già stata usata
  // Recupera il record dell'utente dalla tabella di tw
	tw.getUser(email)
		.then(tableRow => {
      if(tableRow.rows.length > 0){
        $('#IDErrorMessageSignUp').css("display", "block")
        $('#IDErrorMessageSignUp').text('Error, the email is already use')
      }else{
        let pass1 = $('#IDPassword').val()
        let pass2 = $('#IDPassword_repeat').val()
        if(pass1 == pass2){
          fb.signUpWithEmailPassword(email, pass1, baseURL)
          tw.service_97_addNewUser(email, customerCode)

          let db = firebase.firestore()
          let data = db.collection('users').doc(email)

          data.set({
            firstName:$("#IDName").val(),
            lastName: $("#IDLastName").val(),
            email:    $("#IDEmail").val(),
            company:  $("#IDCompanyName").val(),
            state:    $("#IDCountries").val(),
            mobile:   $("#IDPhoneNumber").val(),
          })
          .then(() => {
              $("#user-successAlert").fadeIn(1500);
          })
          .catch((error) => {
            console.log(error)
            $('#IDErrorMessage').css("display", "block")
            $('#IDErrorMessage').text(error)
          })
        }else{
          $('#IDErrorMessage').css("display", "block")
          $('#IDErrorMessage').text('Error, the 2 passwords are different')
        }
      }
    })
		.catch(error => console.error(error))
})


// una chiamata rest per recuperare tutta la lista delle nazione
var url = "https://restcountries.com/v2/all"
// Imposta i settings da utilizzare nelle REST API.
// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
let settings = {
    "url"     : url,
    "method"  : "GET",
    "timeout" : 0,
    "headers" : {},
    "data": "",
    "success": function(country){
        let results = '<option value="-1">Please Select a Country or State</option>'
        for(let i = 0; i < country.length; i++){
            results += '<option>'+ country[i].name +'</option>'
        }
        $("#IDCountries").html(results)
    }
}
// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
// Esegue la chiamata REST API.
$.ajax(settings).then(response => console.log(response));
