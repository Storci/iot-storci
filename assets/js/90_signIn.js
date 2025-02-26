import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"




// Convalida l'inserimento dell'email
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
	}
})

document.addEventListener('DOMContentLoaded',function(){
	document.querySelector('.user-info').addEventListener('keyUp', ()=>{
		let valore = this.value
		let type = this.getAttribute('type')

		if(type === "email"){
		// criteri di controllo per il campo old password
			switch(true){
				case valore == "": this.classList.add("is-invalid").classList.remove('d-none')
			}
		}
	})
})

// Convalida l'inserimento della password
$('.password-field').keyup(function(){
	$("#field-password").addClass("is-valid").removeClass("is-invalid");
})


document.addEventListener('DOMContentLoaded', function() {
	// Funzione per mostrare la password in chiaro.
    document.querySelector('.toggle-password').addEventListener('click', function() {
        let passwordFieldId = this.getAttribute("passwordField");
        let passwordField = document.querySelector('#' + passwordFieldId);

        if (passwordField.getAttribute("type") == "password") {
            this.textContent = "visibility_off";
            passwordField.setAttribute('type', 'text');
        } else {
            this.textContent = "visibility";
            passwordField.setAttribute('type', 'password');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    // Esegue la funzione alla pressione del pulsante.
    document.querySelector('#IDButtonLogin').addEventListener('click', function() {
        // Nasconde il messaggio di errore.
        var errorMessageElement = document.querySelector('#IDErrorMessage');
        if (errorMessageElement) {
            errorMessageElement.classList.add('d-none');
        } else {
            console.error("Element with ID 'IDErrorMessage' not found.");
        }

        // Recupera il valore inserito nel campo email
        let email = document.querySelector('#field-email').value;
        // Recupera il valore della password
        let password = document.querySelector('#field-password').value;

        // Effettua il logout dell'utente alla chiusura della sessione (pagina web)
        if (typeof fb.setPersistenceSession === 'function') {
            fb.setPersistenceSession();
        } else {
            console.error("fb.setPersistenceSession is not a function.");
        }

        // Effettua il login dell'utente con l'email e la password
        fb.signInWithEmailPassword(email, password)
            .then(user => {
                tw.getUser(user.user.email)
                    .then(customer => {
                        // Definizione globale del customer a cui l'utente è associato.
                        localStorage.setItem('global_customer', customer.rows[0].Customer);
                        // Salvo il customer selezionato
                        localStorage.setItem('global_selected_customer', customer.rows[0].Customer);

                        if (customer.rows[0].Customer.includes("Storci")) {
                            // Carica la pagina.
                            window.location.href = "./01_Customers.html";
                        } else {
                            // Salvo il customer selezionato
                            localStorage.setItem('global_entityName', customer.rows[0].entityName);
                            // Carica la pagina.
                            window.location.href = "./02_Dashboard.html?entityName=" + customer.rows[0].entityName;
                        }
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => showError(error));
    });
});

// La funzione mostra l'errore dell'autenticazione
function showError(error) {
    var errorMessageElement = document.querySelector('#IDErrorMessage');
    if (errorMessageElement) {
        errorMessageElement.textContent = error.message;
        errorMessageElement.classList.remove('d-none');
    } else {
        console.error("Element with ID 'IDErrorMessage' not found.");
    }
}





//funzione per mostrare la password dell' utente
document.addEventListener('DOMContentLoaded', function() {
    var showPasswordButton = document.querySelector("#showPassword");
    var passwordField = document.querySelector("#IDPassword");

    if (showPasswordButton && passwordField) {
        showPasswordButton.addEventListener('click', function() {
            if (passwordField.getAttribute('type') === 'password') {
                passwordField.setAttribute('type', 'text');
            } else {
                passwordField.setAttribute('type', 'password');
            }
        });
    } else {
        console.error("Element with ID 'showPassword' or 'IDPassword' not found.");
    }
});

// Function to handle fingerprint authentication
async function handleFingerprintAuthentication() {
    try {
      const email = $("#field-email").val();
  
      // Generate authentication options
      const response = await fetch('http://localhost:3000/generate-authentication-options', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
      }
  
      const options = await response.json();
  
      // Get the credential
      const assertion = await navigator.credentials.get({ publicKey: options });
  
      // Send the credential to the server for verification
      const verificationResponse = await fetch('http://localhost:3000/verify-authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, assertionResponse: assertion }),
      });
  
      if (!verificationResponse.ok) {
        const errorText = await verificationResponse.text();
        throw new Error(`HTTP error! status: ${verificationResponse.status}, response: ${errorText}`);
      }
  
      const verificationResult = await verificationResponse.json();
  
      if (verificationResult.verified) {
        console.log("Fingerprint authentication successful");
        // Redirect to the dashboard or another page
        window.location.href = "./dashboard.html";
      } else {
        throw new Error("Fingerprint authentication failed");
      }
    } catch (error) {
      console.error(error);
      $('#IDErrorMessage').css("display", "block");
      $('#IDErrorMessage').text(error.message);
    }
  }
  
  // Add event listener to the fingerprint button
  document.getElementById("IDButtonFingerprint").addEventListener("click", handleFingerprintAuthentication);


