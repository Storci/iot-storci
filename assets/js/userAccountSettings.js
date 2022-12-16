import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"


fb.onAuthStateChanged_2()
lang.getLanguage()

// *************************************
// ********** CAMBIO PASSWORD **********
// *************************************

// La funzione controlla lo stato dei campi delle password ogni volta che si modifica il campo stesso.
// Se la stringa inserita non corrisponde ai limiti di controllo, il campo viene evidenziato di rosso e una stringa di info appare sotto di esso.
// Se la stringa inserita corrisponde ai criteri, il campo viene evidenziato di verde.
// Quando tutti e 3 i campi sono validi viene abilitato il pulsante per il cambio password.
$('.password-field').keyup(function(){
  let oldPassword = $("#oldPassword").val()
  let newPassword = $("#newPassword").val()
  let confirmPassword = $("#confirmPassword").val()

  let status_old_Password = false;
  let status_new_Password = false;
  let status_confirm_Password = false;

  // Criteri di controllo per il campo old password
  switch(true){
    case oldPassword == "": $("#invalid-mess-10").text("Please, insert your current password."); $("#oldPassword").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#oldPassword").addClass("is-valid").removeClass("is-invalid"); status_old_Password = true; break;
  }
  // Criteri di controllo per il campo new password
  switch(true){
    case newPassword == "": $("#invalid-mess-11").text("Please, insert your new password."); $("#newPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case newPassword.length < 8: $("#invalid-mess-11").text("Attention, password must be long of 8 characters"); $("#newPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case newPassword.length > 20: $("#invalid-mess-11").text("Attention, password must be short of 20 characters"); $("#newPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[a-z]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a low character"); $("#newPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[0-9]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a number"); $("#newPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case !newPassword.match(/[A-Z]+/): $("#invalid-mess-11").text("Attention, password must be contain at least a up character"); $("#newPassword").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#newPassword").addClass("is-valid").removeClass("is-invalid"); status_new_Password = true; break;
  }
  // Criteri di controllo per il campo confirm password
  switch(true){
    case confirmPassword == "": $("#invalid-mess-12").text("Please, confirm your new password."); $("#confirmPassword").addClass("is-invalid").removeClass("is-valid"); break;
    case confirmPassword !== newPassword: $("#invalid-mess-12").text("Attention, the passwords not match"); $("#confirmPassword").addClass("is-invalid").removeClass("is-valid"); break;
    default: $("#confirmPassword").addClass("is-valid").removeClass("is-invalid"); status_confirm_Password = true; break;
  }

  // Cambio stato del pulsante in base ai campi validi
  if(status_old_Password && status_new_Password && status_confirm_Password){
    $('#passwordUpdate').removeAttr("disabled")
  }else{
    $('#passwordUpdate').attr("disabled", "disabled")
  }
})

// Pulsante di cambio password premuto.
$('#passwordUpdate').click(function(){
  $("#errorAlert").fadeOut(250);
  $("#successAlert").fadeOut(250);

  let oldPassword = $('#oldPassword').val();
  let newPassword = $('#newPassword').val();
  let confirmPassword = $('#confirmPassword').val();

  let user = firebase.auth().currentUser;

  const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword)

  user.reauthenticateWithCredential(credential)
  .then(() => {
    user.updatePassword(newPassword)
    .then(() => { $("#successAlert").fadeIn(1500) })
    .catch((error) => { $("#errorAlert").fadeIn(1500) })
  })
  .catch((error) => { $("#errorAlert").fadeIn(1500) })
})

// Funzione per mostrare la password in chiaro.
$(".toggle-password").click(function(){
  let id = "#" + $(this).attr("passwordField")

  if($(id).attr("type") == "password"){
    $(this).text("visibility_off")
    $(id).attr("type", "text")
  }else{
    $(this).text("visibility")
    $(id).attr("type", "password")
  }
})




$('.user-info').keyup(function(){
  let value = $(this).val()
  let type = $(this).attr("type")

  if(type == "email"){
    // Criteri di controllo per il campo old password
    switch(true){
      case value == "": $(this).addClass("is-invalid").removeClass("is-valid"); break;
      case !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/): $(this).addClass("is-invalid").removeClass("is-valid"); break;
      default: $(this).addClass("is-valid").removeClass("is-invalid"); break;
    }
  }else if(type == "tel"){
    // Criteri di controllo per il campo old password
    switch(true){
      case value == "": $(this).addClass("is-invalid").removeClass("is-valid"); break;
      case !value.match(/^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm): $(this).addClass("is-invalid").removeClass("is-valid"); break;
      default: $(this).addClass("is-valid").removeClass("is-invalid"); break;
    }
  }else{
    // Criteri di controllo per il campo old password
    switch(true){
      case value == "": $(this).addClass("is-invalid").removeClass("is-valid"); break;
      default: $(this).addClass("is-valid").removeClass("is-invalid"); break;
    }
  }
})



// Pulsante di salvataggio dati premuto.
$('#userUpdate').click(function(){
  $("#user-successAlert").fadeOut(250)
  $("#user-errorAlert").fadeOut(250)

  let db = firebase.firestore()
  let data = db.collection('users').doc(firebase.auth().currentUser.email)

  data.set({
    firstName:$("#field-firstname").val(),
    lastName: $("#field-lastname").val(),
    email:    $("#field-email").val(),
    company:  $("#field-company").val(),
    state:    $("#field-state").val(),
    zip:      $("#field-zip").val(),
    mobile:   $("#field-mobile").val(),
  })
  .then(() => {
      $("#user-successAlert").fadeIn(1500);
  })
  .catch((error) => {
      $("#user-errorAlert").fadeIn(1500);
  });
})



firebase.auth().onAuthStateChanged(user => {
  // recupera i dati da firestore
  let db = firebase.firestore()
  let data = db.collection('users').doc(user.email)

  data.get()
  .then((doc) => {
    if (doc.exists) {
          console.log("Document data:", doc.data());

          $("#field-firstname").val(doc.data().firstName)
          $("#field-lastname").val(doc.data().lastName)
          $("#field-email").val(doc.data().email)
          $("#field-company").val(doc.data().company)
          $("#field-state").val(doc.data().state)
          $("#field-zip").val(doc.data().zip)
          $("#field-mobile").val(doc.data().mobile)

      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  })
  .catch((error) => {
      console.log("Error getting document:", error);
  })

  tw.service_100_getUser(user.email)
  .then(usertw => {
    console.log(usertw)
    if (usertw.rows[0].notificationEnabled){
      $("#notification-toggle").prop('checked', true)
    }else{
      $("#notification-toggle").prop('checked', false)
    }
  })
})


$("#notification-toggle").click(function(){
  let user = firebase.auth().currentUser;

  tw.service_99_setNotificationPermission(user.email, $(this).prop('checked'))

  setTimeout(()=>{
    tw.service_100_getUser(user.email)
    .then(usertw => {
      console.log(usertw)
      if (usertw.rows[0].notificationEnabled){
        $("#notification-toggle").prop('checked', true)
      }else{
        $("#notification-toggle").prop('checked', false)
      }
    })
  }, 2000)
})
