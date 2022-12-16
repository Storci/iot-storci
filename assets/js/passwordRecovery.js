import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import Cookies from './Global/Cookie/api.js'

// definisce l'url di base della pagina attuale (in questo caso della pagina index.html).
// il risultato è http(s)://xxx.xxx.xxx.xxx:xxxx
// baseURL verrà utilizzato come base per il cambio pagina.
let baseURL = window.location.protocol + "//" + window.location.host

// Convalida l'inserimento dell'email
$('.user-info').keyup(function(){
    $("#errorAlert2").addClass('d-none')
    $("#errorAlert").addClass('d-none')

	let value = $(this).val()
	let type = $(this).attr("type")

	if(type == "email"){
		// Criteri di controllo per il campo old password
		switch(true){
			case value == "": $(this).addClass("is-invalid").removeClass("is-valid"); break;
			case !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/): $(this).addClass("is-invalid").removeClass("is-valid"); break;
			default: $(this).addClass("is-valid").removeClass("is-invalid"); break;
		}
	}
})

$("#IDErrorMessage").hide()
let auth = firebase.auth()

$('#IDButtonResetPassword').click(function(e){
    e.preventDefault()
    let email = $('#field-email').val()

    if(email != ""){
        auth.sendPasswordResetEmail(email)
        .then(() =>{
            $("#successAlert").removeClass('d-none')
            setTimeout(function(){ $("#successAlert").css('display', 'none') },5000) 
            window.location.href = './90_signIn.html'
        })
        .catch(error =>{
            $("#errorAlert2").removeClass('d-none')
            $("#errorAlert2").fadeIn(3000);
        })
    }
    else{
        $("#errorAlert").removeClass('d-none')
        $("#errorAlert").fadeIn(3000);
    }

})