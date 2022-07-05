import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"

// Nasconde il messaggio di errore.
$("#IDErrorMessage").addClass('d-none')

// Esegue la funzione alla pressione del pulsante.
$("#IDButtonLogin").click(function(){
	//  Nasconde il messaggio di errore.
	$("#IDErrorMessage").addClass('d-none')
	// Recupera il valore inserito nel campo email.
	let email = $("#IDEmail").val()
	// Recupera il valore inserito nel campo password.
	let password = $("#IDPassword").val()
	// Effettua il logout dell'utente alla chiusura della sessione (pagina web)
	fb.setPersistenceSession()
	// Definisce l'utente
	let user;
	// Effettua il login dell'utente con l'email e la password
	fb.signInWithEmailPassword(email, password)
		.then(user => {
			tw.getUser(user.user.email)
				.then(customer => {
					// Definizione globale del customer a cui l'utente è associato.
					localStorage.setItem('global_customer', customer.rows[0].Customer)
					// salvo il customer selezionato
					localStorage.setItem('global_selected_customer', customer.rows[0].Customer)

					if(customer.rows[0].Customer.includes("Storci")){
						// Carica la pagina.
						window.location.href = "./01_Customers.html"
					}else{
						// salvo il customer selezionato
						localStorage.setItem('global_entityName', customer.rows[0].entityName)
						// Carica la pagina.
						window.location.href = "./02_Dashboard.html?entityName=" + customer.rows[0].entityName
					}
				})
				.catch(error => console.error(error))
		})
		.catch(error => showError(error))
})


// La funzione mostra l'errore dell'autenticazione
function showError(error){
	// Logga l'errore
	console.error("Err: " + error)
	// Imposta il testo.
	$("#IDErrorMessage").text(error)
	// Mostra il testo dell'errore.
	$("#IDErrorMessage").removeClass('d-none')
}


//funzione per mostrare la password dell' utente
$("#showPassword").click(function(){
	let password = $('#IDPassword')
	if(password.attr('type') == "password"){
		password.attr('type', 'text')
	}else{
		password.attr('type','password')
	}
})
