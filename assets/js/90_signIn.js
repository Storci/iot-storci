import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"

if (!PublicKeyCredential) {
  alert('WebAuthn is not supported in this browser');
}

// Modify credential request
// const credential = await navigator.credentials.get({
//   publicKey: {
//     ...publicKeyConfig,
//     userVerification: 'required'
//   },
//   signal: controller.signal,
//   mediation: 'optional'
// });

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
    let email = document.querySelector('#IDEmail').value;
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

// Funzione per mostrare la password dell'utente
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
// Base64URL Conversion Helpers
function base64ToBase64Url(b64) {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlToBase64(b64url) {
  let padding = '';
  if (b64url.length % 4 === 2) padding += '==';
  else if (b64url.length % 4 === 3) padding += '=';
  return b64url.replace(/-/g, '+').replace(/_/g, '/') + padding;
}

async function handleFingerprintAuthentication(email) {
  try {

    console.log('Email sent for authentication:', email);
    // Add loading state
    console.group('[WebAuthn Debug]');
    console.log('Starting auth for:', email);


    
    // Get authentication options
   console.log('Step 1: Requesting auth options');
    const optionsResponse = await fetch('http://localhost:3000/generate-authentication-options',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    console.log('Auth options status:', optionsResponse.status);

    // Verify options response
    if (!optionsResponse.ok) {
      const error = await optionsResponse.json();
      throw new Error(error.error || 'Failed to get authentication options');
    }

    const options = await optionsResponse.json();
    console.log('Auth options:', options);

    // Convert challenge PROPERLY
    const decodedChallenge = Uint8Array.from(
      atob(base64UrlToBase64(options.challenge)),
      c => c.charCodeAt(0)
    );
    console.log('Challenge buffer:', decodedChallenge);

    // 3. Convert credentials
    console.log('Step 3: Converting allowCredentials');
    const allowCredentials = options.allowCredentials.map(cred => {
      const idBuffer = Uint8Array.from(
        atob(base64UrlToBase64(cred.id)),
        c => c.charCodeAt(0)
      );
      console.log('Credential ID:', cred.id, 'Buffer:', idBuffer);
      return {
        ...cred,
        id: idBuffer
      };
    });

    // 4. Create publicKey request
    console.log('Step 4: Creating credential request');
    const publicKey = {
      challenge: decodedChallenge,
      allowCredentials: allowCredentials,
      rpId: options.rpID,
      timeout: options.timeout,
      userVerification: 'preferred',
    };
    console.log('PublicKey config:', publicKey);

    // Set timeout and signal
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 120000);

    // Get credential
    const credential = await navigator.credentials.get({
      publicKey: publicKey,
      signal: controller.signal,
      mediation: 'optional' // consider removing if not needed
    });
    
    if (typeof PublicKeyCredential !== 'undefined' && 
      !PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable = async () => true;
  }

    // Prepare verification response
    const authenticationResponse = {
      id: credential.id,
      rawId: base64ToBase64Url(
        btoa(String.fromCharCode(...new Uint8Array(credential.rawId)))
      ),
      type: credential.type,
      response: {
        clientDataJSON: base64ToBase64Url(
          btoa(String.fromCharCode(...new Uint8Array(credential.response.clientDataJSON)))
        ),
        authenticatorData: base64ToBase64Url(
          btoa(String.fromCharCode(...new Uint8Array(credential.response.authenticatorData)))
        ),
        signature: base64ToBase64Url(
          btoa(String.fromCharCode(...new Uint8Array(credential.response.signature)))
        ),
        userHandle: credential.response.userHandle,
      },
    };

    // Verify with server
    const verificationResponse = await fetch('http://localhost:3000/verify-authentication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, authenticationResponse }),
    });

    const result = await verificationResponse.json();
    
    if (result.success) {
      console.log('Login successful!', result.user);
      window.location.href = '/dashboard';
    } else {
      console.error('Login failed:', result.error);
      showLoginError(result.error);
    }
  } catch (error) {
    console.error('Authentication error:', error);
    showLoginError(error.message);
  } finally {
    $('#IDButtonFingerprint').prop('disabled', false).text('Fingerprint Login');
  }
  
}

function showLoginError(message) {
  $('#loginErrorMessage').text(message).show();
}

// Add login form handler
$('#IDButtonFingerprint').click(async (e) => {
  e.preventDefault();
  // Verify this matches your HTML input ID
  const email = $('#IDEmail').val().trim();
if (!validateEmail(email)) {
  showLoginError('Please enter a valid email address');
  return;
}
  
  await handleFingerprintAuthentication(email);
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}




