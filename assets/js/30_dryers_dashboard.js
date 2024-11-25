// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"

$(document).ready(() => {
	showSpinner()
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	// Recupera l'entity name della thing
	let entityName = urlParams.get('entityName')
	console.log(entityName)
	let selectedCustomer = localStorage.getItem("global_selected_customer")

	// Recupera il nome dell'utente da firebase, controlla che sia loggato.
	// Nel caso non fosse loggato richiama la pagina di login
	fb.onAuthStateChanged_2()
	// funzione di traduzione sia per i testi statici e testi dinamiche
	// i testi caricati dalle funzioni.
	lang.getLanguage()


	createCellCardNew(selectedCustomer)
	setInterval(getCellInfoNew, 30000, selectedCustomer)
})

// ************************************
// ************ FUNCTIONS *************
// ************************************

function showSpinner() {
	$('.loader').show(); // Show the spinner

	// Add click event listener to hide the spinner
	document.body.addEventListener('click', hideSpinner);
}

function hideSpinner() {
	$('.loader').hide(); // Show the spinner
	// Remove click event listener to avoid multiple bindings
	document.body.removeEventListener('click', hideSpinner);
}

// Definisce il codice html delle card e le aggiunge all'elemento ROW
// Ad ogni card viene associata la funzoine onClick per aprire la pagina corrispondente
function createCellCardNew(selectedCustomer) {
	tw.getCustomerCells_V2(selectedCustomer)
	.then(dryers => {
		console.log(dryers)
		dryers.rows.forEach((dryer,i) => {
			// Genera un id per la singola card
			let id = "IDCardCellGroup" + i;
			// Definisce il codice html
			//style="border-color: rgba(0,0,0,0);"
			let card = '<div class="col col-customer" style="margin: 0px; margin-top: 1rem !important">'
			card += '<div id="' + id + '" class="card h-100 card_cells card-border">'
			card += '<div class="card-body card-hover ' + id + 'Body" style="padding: 0px;border-radius: 4px;border-width: 1px;border-color: rgba(33,37,41,0);">'
			card += '<div class="row" style="margin: 0px;padding-top: 10px;padding-bottom: 5px;">'
			card += '<div class="col" style="padding: 0px;padding-right: 12px;padding-left: 12px;">'
			card += '<h4 style="margin: 0px;color: var(--bs-heading-high-emphasis);">'
			card += '<span class="' + id + 'Title" style="margin-right: 5px; color: var(--bs-heading-high-emphasis);" translate_id="dryer">Cella</span>'
			card += '<span id="' + id + 'Nome_Cella" class="' + id + 'Title" style="margin-right: 5px; color: var(--bs-heading-high-emphasis);">1</span>'
			card += '</h4>'
			card += '</div>'
			card += '<div class="col d-flex justify-content-end align-items-center">'
			card += '<h6 class="d-flex justify-content-end" style="margin: 0px;color: var(--bs-heading-high-emphasis);">'
			card += '<span id="' + id + 'Numero_Carrelli" ' + id + 'Value" style="margin-right: 5px;">6</span>'
			card += '<span class="' + id + 'Value" translate_id="trolleys">Carrelli</span>'
			card += '</h6>'
			card += '</div>'
			card += '</div>'
			card += '<div class="row ' + id + 'rowdark" style="margin: 0px;padding-bottom: 5px;">'
			card += '<div class="col" style="padding: 0px;padding-right: 12px;padding-left: 12px;">'
			card += '<h6 id="' + id + 'Stato_Cella" class="' + id + 'Value" style="margin: 0px;color: var(--bs-heading-medium-emphasis);font-size: 14px;">In essicazione</h6>'
			card += '</div>'
			card += '</div>'
			card += '<div class="row" style="margin: 0px;margin-bottom: 30px;margin-top: 30px;">'
			card += '<div class="col d-flex flex-column justify-content-top align-items-start" style="padding: 0px;padding-right: 12px;padding-left: 12px;">'
			card += '<h6 class="' + id + 'Label" style="margin: 0 0 8px 0;color: var(--bs-heading-medium-emphasis);font-size: 14px;" translate_id="recipe">Recipe</h6>'
			card += '<h6 id="' + id + 'Ricetta_in_Uso" class="' + id + 'Value" style="margin: 0px;color: var(--bs-heading-high-emphasis);font-size: 14px;">Pasta Lunga</h6>'
			card += '</div>'
			card += '<div class="col d-flex flex-column justify-content-top align-items-start" style="padding: 0px;padding-right: 12px;padding-left: 12px;">'
			card += '<h6 class="' + id + 'Label" style="margin: 0 0 8px 0;color: var(--bs-heading-medium-emphasis);font-size: 14px;" translate_id="recipe_time">Recipe time</h6>'
			card += '<h6 id="' + id + 'Tempo_Pianificato" class="' + id + 'Value" style="margin: 0px;color: var(--bs-heading-high-emphasis);font-size: 14px;">20 ore</h6>'
			card += '</div>'
			card += '<div class="col d-flex flex-column justify-content-top align-items-start" style="padding: 0px;padding-right: 12px;padding-left: 12px;">'
			card += '<h6 class="' + id + 'Label" style="margin: 0 0 8px 0;color: var(--bs-heading-medium-emphasis);font-size: 14px;" translate_id="worked_time">Work time</h6>'
			card += '<h6 id="' + id + 'Tempo_in_Lavorazione" class="' + id + 'Value" style="margin: 0px;color: var(--bs-heading-high-emphasis);font-size: 14px;">5 ore</h6>'
			card += '</div>'
			card += '</div>'
			card += '</div>'
			card += '</div>'
			card += '</div>'
			// Aggiunge la card alla row
			$("#IDRow").append(card)

			document.getElementById(id).onclick = function () {
				window.location.href = "./32_dryer_dashboard.html?entityName=" + dryer.entityName
			}
			lang.getLanguage()

			updateCardInfo(dryer, i)
		});
		hideSpinner()
	})
	.catch(error => console.error(error))
}

// Funzione che recupera i dati del cliente da TW
function getCellInfoNew(selectedCustomer) {
	tw.getCustomerCells_V2(selectedCustomer)
	.then(dryers => {
		dryers.rows.forEach((dryer,i) => {	updateCardInfo(dryer, i) });
	})
	.catch(error => console.error(error))
}


function updateCardInfo(dryer, i){			
	// Genera l'id che identifica i campi della singola card da valorizzare
	let ID = "#IDCardCellGroup" + i;
	let ClassTitle = ".IDCardCellGroup" + i + "Title"
	let ClassLabel = ".IDCardCellGroup" + i + "Label"
	let ClassValue = ".IDCardCellGroup" + i + "Value"

	let ID_Numero_Carrelli = "#IDCardCellGroup" + i + "Numero_Carrelli"
	let IDnomeCella = "#IDCardCellGroup" + i + "Nome_Cella"
	let IDstatoCella = "#IDCardCellGroup" + i + "Stato_Cella"
	let IDricettaInUso = "#IDCardCellGroup" + i + "Ricetta_in_Uso"
	let IDtempoPianificato = "#IDCardCellGroup" + i + "Tempo_Pianificato"
	let IDtempoInLavorazione = "#IDCardCellGroup" + i + "Tempo_in_Lavorazione"

	try{ $(ID_Numero_Carrelli).text(dryer.numero_carrelli) }catch(e){console.warn(e)}
	try{ $(IDnomeCella).text(dryer.name) }catch(e){console.warn(e)}
	try{ $(IDstatoCella).text(dryer.stato) }catch(e){console.warn(e)}
	try{ $(IDricettaInUso).text(dryer.ricetta) }catch(e){console.warn(e)}
	try{ $(IDtempoPianificato).text(dryer.durata) }catch(e){console.warn(e)}
	try{ $(IDtempoInLavorazione).text(dryer.tempoLavoro) }catch(e){console.warn(e)}

	//Bianco
	$(ID).css("background-color", "var(--bs-card-background-default)")
	$(ClassTitle).css("color", "var(--bs-primary-color-label)")
	$(ClassLabel).css("color", "var(--bs-heading-medium-emphasis)")
	$(ClassValue).css("color", "var(--bs-heading-high-emphasis)")

	if (dryer.stato == "Running") {
		// VERDE
		$(ID).css("background-color", "var(--bs-card-background-green)")
		$(ClassTitle).css("color", "var(--bs-card-title-green)")
		$(ClassLabel).css("color", "var(--bs-card-label-green)")
		$(ClassValue).css("color", "var(--bs-card-value-green)")
	}
	if (dryer.stato == "Stand By") {
		// Arancione
		$(ID).css("background-color", "var(--bs-card-background-yellow)")
		$(ClassTitle).css("color", "var(--bs-card-title-yellow)")
		$(ClassLabel).css("color", "var(--bs-card-label-yellow)")
		$(ClassValue).css("color", "var(--bs-card-value-yellow)")
	}
	if (dryer.stato == "undefined") {
		// Grigio
		$(ID).css("background-color", "var(--bs-card-background-undefined)")
		$(ClassTitle).css("color", "var(--bs-card-title-undefined)")
		$(ClassLabel).css("color", "var(--bs-card-label-undefined)")
		$(ClassValue).css("color", "var(--bs-card-value-undefined)")
	}
}