// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as am from "./Global/amchart/amchart_functions.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"
import * as common from "./Global/Common/commonFunctions.js"


const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)


// Recupera dei dati dalle local storage
let selectedCustomer = localStorage.getItem("global_selected_customer")

// recupero dell'entityname della macchina
let entityName = urlParams.get('entityName')
console.log(entityName)

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()
// funzione per la traduzione
lang.getLanguage()


// funzione che carica lo spinner
showSpinner()


// Definisce le variabili come date
let timeStartHistory = new Date()
let timeEndHistory = new Date()
let timeStartZoom = new Date()
let timeEndZoom = new Date()
// Imposta X giorni prima della data odierna
timeStartHistory.setDate(timeStartHistory.getDate() - 14)
// Imposta i 2 data picker con le date calcolate prima
// La funzione getDate ritorna solamente l'anno, il mese e il giorno
// yyyy-MM-dd
let disp_timeStart = common.getDate(timeStartHistory)
let disp_timeEnd = common.getDate(timeEndHistory)

$('#dateTimePicker').daterangepicker({
	"locale": {
		"format": "YYYY/MM/DD",
		"separator": " - ",
		"applyLabel": "Apply",
		"cancelLabel": "Cancel",
		"fromLabel": "From",
		"toLabel": "To",
		"customRangeLabel": "Custom",
		"weekLabel": "W",
		"daysOfWeek": [
			"Su",
			"Mo",
			"Tu",
			"We",
			"Th",
			"Fr",
			"Sa"
		],
		"monthNames": [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		],
		"firstDay": 1
	},
	"startDate": disp_timeStart,
	"endDate": disp_timeEnd
}, function (start, end, label) {
	/*
	// Recupera tutte le celle installate dal cliente
	tw.getCustomerCells(selectedCustomer)
		.then(dryers => { listHistoryProduction(dryers, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')) })
		.catch(error => console.error(error))
	*/
	listHistoryProduction_new(selectedCustomer, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
});

// Istanzia i grafici dell'attuale e dello storico
// I grafici devono essere istanziati una volta solamente
// La funzione am.createXYChart ha i seguenti parametri di ingresso
// - ID del div che contiene il grafico
// - ID del div che contiene la legenda
// - ID per la colorazione delle series
// - Numero di assi Y associate al GRAFICO
// - Array con le unità di misura
let arrayUM = ['', '']
let chartHistoryProduction = am.createXYChart("IDTrendHistoryProduction", 'IDLegendHistoryProduction', 0, 2, arrayUM, true)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartHistoryProduction, "PV - Temperature Ambient", "time", "PV_Temperatura_Ambiente", "°C", 0, false, true, 0.77)
am.createLineSeries(chartHistoryProduction, "PV - Temperature", "time", "PV_Temperatura_Cella", "°C", 0, false, false, true, 0.77)
am.createLineSeries(chartHistoryProduction, "SP - Temperature", "time", "SP_Temperatura_Cella", "°C", 0, false, false, 0.77)
am.createLineSeries(chartHistoryProduction, 'PV - Humidity Ambient', 'time', 'PV_Umidita_Ambiente', '%H', 0, false, true, 0.77)
am.createLineSeries(chartHistoryProduction, 'PV - Humidity', 'time', 'PV_Umidita_Cella', '%H', 0, false, false, 0.77)
am.createLineSeries(chartHistoryProduction, 'SP - Humidity', 'time', 'SP_Umidita_Cella', '%H', 0, false, false, 0.77)
am.createLineSeries(chartHistoryProduction, 'PV - kcal/h', 'time', 'PV_Consumo_Ciclo', 'kcal', 1, false, true, 0.77)

// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
setInterval(am.refreshLegendSize, 1000, chartHistoryProduction, 'IDLegendHistoryProduction')

// Definisce la query da inviare a influxdb
// I parametri da sostituire sono indicati da {1}, {2}, ecc...
// Invece l'entityName è sempre comune per tutte le query
let query = 'SELECT '
query += 'mean("Dati_Aggiuntivi_Temperatura_Ambiente") as "PV_Temperatura_Ambiente", '
query += 'mean("Dati_Ciclo_Temperatura_PV") as "PV_Temperatura_Cella", '
query += 'mean("Dati_Ciclo_Temperatura_SP") as "SP_Temperatura_Cella", '
query += 'mean("Dati_Aggiuntivi_Umidita_Ambiente") as "PV_Umidita_Ambiente", '
query += 'mean("Dati_Ciclo_Umidita_PV") as "PV_Umidita_Cella", '
query += 'mean("Dati_Ciclo_Umidita_SP") as "SP_Umidita_Cella", '
query += 'mean("Dati_Aggiuntivi_Kcal_Ciclo") as "PV_Consumo_Ciclo" '
query += 'FROM "{3}" '
query += 'WHERE time > {1}ms and time < {2}ms GROUP BY time(10s) fill(previous)'


// Cancella tutte le righe della tabella
$("#IDHistoryTableBody").empty()
listHistoryProduction_new(selectedCustomer, timeStartHistory, timeEndHistory)

let direction = true
$("th").click(function () {
	let icon = "#" + $(this)[0].children[0].children[1].id
	$(".icon-table").addClass("d-none")
	$(icon).removeClass("d-none")

	if (direction) {
		$(icon).text("expand_more")
	} else {
		$(icon).text("expand_less")
	}


	let column = $(this).index()
	let table = $("#IDHistoryTableBody")

	//let start = new Date().getTime()
	insertionSort(table[0], column, direction)
	//let stop  = new Date().getTime()
	//console.log(stop-start + " ms")

	direction = !direction
})

// Funzione di ricerca nella tabella
$("#filter").on("keyup", function () {
	let value = $(this).val()
	$("#IDHistoryTableBody tr").filter(function () {
		$(this).toggle($(this).text().indexOf(value) > -1)
	})
})
hideSpinner()



// ************************************
// ************ FUNCTIONS *************
// ************************************

function convertDate(s) {
	let sdate = s
	sdate = sdate.split(", ")
	let date = sdate[0]
	date = date.split("/")
	let time = sdate[1]

	let day = date[0]
	let month = date[1]
	let year = date[2]

	return Date.parse(year + "/" + month + "/" + day + " " + time)
}

function insertionSort(table, column, dir) {
	let rows = table.children
	let parent = table

	for (let i = 1; i < rows.length; i++) {
		for (let j = i - 1; j > -1; j--) {
			let value1 = rows[j].getElementsByTagName("TD")[column].innerHTML
			let value2 = rows[j + 1].getElementsByTagName("TD")[column].innerHTML

			if (column == 0 || column == 1) {
				value1 = convertDate(value1)
				value2 = convertDate(value2)
			}

			if (dir) {
				if (value2 < value1) {
					parent.insertBefore(rows[j + 1], rows[j])
				}
			} else {
				if (value2 > value1) {
					parent.insertBefore(rows[j + 1], rows[j])
				}
			}
		}
	}
}

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

function showSpinnerTable() {
	console.log("spinner on")
	$('.spinner-border').show(); // Show the spinner
	$('.tableDiv').css('opacity', '0.5'); // 
}

function hideSpinnerTable() {
	console.log("spinner off")
	$('.spinner-border').hide(); // Show the spinner
	$('.tableDiv').css('opacity', '1'); // 
}

function listHistoryProduction_new(customer, timeStart, timeEnd) {
	showSpinnerTable()
	$("#IDHistoryTableBody").empty()
	// Recupera lo storico delle lavorazioni effettuate dalla cella
	tw.service_03_getDryerHistoryProductions("%" + customer + "%", timeStart, timeEnd)
		.then(productions => {
			// Per ogni ricetta trovata genera una nuova riga nella tabella
			productions.rows.forEach((el, i) => {
				// Converte il timestamp in Date
				let start = new Date(el.timeStart).toLocaleString();
				let end = new Date(el.timeEnd).toLocaleString();

				let dryer_name = el.entityName.split(".")
				dryer_name = dryer_name[4] + " " + dryer_name[5]

				// Definisce l'id della riga della tabella
				let id = "IDHistoryTableRow" + i;
				// Definisce l'html della riga da aggiungere
				let row = '<tr id=' + id + ' class="hover_tr" style="border-style: none;background: var(--bs-table-bg);">'
				row += '    <td style="font-size: 12px;border-style: none;">' + start + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + end + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.ricetta + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.durata + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + dryer_name + '</td>'
				row += '</tr>'
				// Aggiunge la riga alla tabella
				$("#IDHistoryTableBody").append(row)
				// Imposta i timestamp di inizio e fine essiccazione (il range temporale è allargato 30 min prima dell'inizio e 30 min dopo la fine)
				let timestampStart = el.timeStart - 1800000
				let timestampEnd = el.timeEnd + 1800000
				// Controlla se la data è invalida, nel caso l'essiccazione è in corso e carica la data attuale
				if (timestampEnd == undefined || timestampEnd == null || timestampEnd == '' || Number.isNaN(timestampEnd)) {
					timestampEnd = Date.now() + 1800000
				}

				id = "#" + id
				$(id).click(function () {
					entityName = el.entityName
					// Aggiunge la classe table-primary alla riga seleziona e la rimuove dalle altre righe
					$(this).addClass('table-primary').siblings().removeClass('table-primary')
					// Definisce la query da inviare a influxdb
					let subquery = query.replaceAll('{1}', timestampStart).replaceAll('{2}', timestampEnd).replaceAll('{3}', el.entityName)
					// Recupera i dati da influxdb e li visualizza sul grafico
					am.setChartData(chartHistoryProduction, subquery, '')
					timeStartZoom = timestampStart
					timeEndZoom = timestampEnd

					$('#fullscreenHistoryCell').click(function () {
						let url = '60_dryers_history_zoom.html?' + 'entityName=' + entityName + '&timeStart=' + timeStartZoom + '&timeEnd=' + timeEndZoom
						window.open(url, '_blank')
						console.log(e)
					})

					tw.service_05_getDryerStartEnd(el.entityName, timestampStart, timestampEnd)
						.then(result => {
							//console.log(result)
							let range = chartHistoryProduction.xAxes.values[0].axisRanges.values[0]
							range.date = new Date(result.array[0].start)
							range.grid.stroke = am4core.color("#396478");
							range.grid.strokeWidth = 2;
							range.grid.strokeOpacity = 0.6;
							range.label.inside = true;
							range.label.text = "Inizio Essicazione";

							let range1 = chartHistoryProduction.xAxes.values[0].axisRanges.values[1]
							range1.date = new Date(result.array[0].stop)
							range1.grid.stroke = am4core.color("#396478");
							range1.grid.strokeWidth = 2;
							range1.grid.strokeOpacity = 0.6;
							range1.label.inside = true;
							range1.label.text = "Fine Essicazione";

							if (result.array[0].endLoad) {
								let range2 = chartHistoryProduction.xAxes.values[0].axisRanges.values[2]
								range2.date = new Date(result.array[0].endLoad)
								range2.grid.stroke = am4core.color("#396478");
								range2.grid.strokeWidth = 2;
								range2.grid.strokeOpacity = 0.6;
								range2.label.inside = true;
								range2.label.text = "Fine Carico";
							}
						})
						.catch(e => { console.log(e) })
				})
			})
			
			// Recupera la prima riga della tabella
			let elem = document.getElementById('IDHistoryTableRow0')
			// Definisce la variabile come click event
			let clickEvent = new Event('click');
			// Esegue l'evento dell'elemento, in questo modo simula il click
			// sulla prima riga della tabella, e viene caricato il grafico
			elem.dispatchEvent(clickEvent)
			
			hideSpinnerTable()
		})
}
