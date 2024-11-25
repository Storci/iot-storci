// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as am from "./Global/amchart/amchart_functions.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"
import * as common from "./Global/Common/commonFunctions.js"

// definisce l'url di base della pagina attuale (in questo caso della pagina index.html).
// il risultato è http(s)://xxx.xxx.xxx.xxx:xxxx
// baseURL verrà utilizzato come base per il cambio pagina.


const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

showSpinner()

// Recupera dei dati dalle local storage
let selectedCustomer = localStorage.getItem("global_selected_customer")
let selectedLine = localStorage.getItem("global_selected_cell")
//let entityName			 = localStorage.getItem('global_selected_cell_entityName')
// Recupera l'entity name della thing
let entityName = urlParams.get('entityName')
console.log(entityName)

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()
// funzione per la traduzione
lang.getLanguage()

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
	// Recupera tutte le celle installate dal cliente
	listHistoryProduction_new(entityName, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
	timeStartZoom = timeStartHistory
	timeEndZoom = timeEndHistory
});



// Istanzia i grafici dell'attuale e dello storico
// I grafici devono essere istanziati una volta solamente
// La funzione am.createXYChart ha i seguenti parametri di ingresso
// - ID del div che contiene il grafico
// - ID del div che contiene la legenda
// - ID per la colorazione delle series
// - Numero di assi Y associate al GRAFICO
// - Array con le unità di misura
let arrayUM = ['','']
let chartActualProduction = am.createXYChart("IDTrendActualProduction", 'IDLegendActualProduzione', 0, 2, arrayUM)
let chartHistoryProduction = am.createXYChart("IDTrendHistoryProduction", 'IDLegendHistoryProduction', 0, 2, arrayUM)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartActualProduction, "PV - Temperature Ambient", "time", "PV_Temperatura_Ambiente", "°C", 0, false, true)
am.createLineSeries(chartActualProduction, "PV - Temperature", "time", "PV_Temperatura_Cella", "°C", 0, true, false, true)
am.createLineSeries(chartActualProduction, "SP - Temperature", "time", "SP_Temperatura_Cella", "°C", 0, false, false)
am.createLineSeries(chartActualProduction, 'PV - Humidity Ambient', 'time', 'PV_Umidita_Ambiente', '%H', 0, false, true)
am.createLineSeries(chartActualProduction, 'PV - Humidity', 'time', 'PV_Umidita_Cella', '%H', 0, true, false)
am.createLineSeries(chartActualProduction, 'SP - Humidity', 'time', 'SP_Umidita_Cella', '%H', 0, false, false)
am.createLineSeries(chartActualProduction, 'PV - kcal/h', 'time', 'PV_Consumo_Ciclo', 'kcal', 1, false, true)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartHistoryProduction, "PV - Temperature Ambient", "time", "PV_Temperatura_Ambiente", "°C", 0, false, true)
am.createLineSeries(chartHistoryProduction, "PV - Temperature", "time", "PV_Temperatura_Cella", "°C", 0, true, false, true)
am.createLineSeries(chartHistoryProduction, "SP - Temperature", "time", "SP_Temperatura_Cella", "°C", 0, false, false)
am.createLineSeries(chartHistoryProduction, 'PV - Humidity Ambient', 'time', 'PV_Umidita_Ambiente', '%H', 0, false, true)
am.createLineSeries(chartHistoryProduction, 'PV - Humidity', 'time', 'PV_Umidita_Cella', '%H', 0, true, false)
am.createLineSeries(chartHistoryProduction, 'SP - Humidity', 'time', 'SP_Umidita_Cella', '%H', 0, false, false)
am.createLineSeries(chartHistoryProduction, 'PV - kcal/h', 'time', 'PV_Consumo_Ciclo', 'kcal', 1, false, true)

// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
setInterval(am.refreshLegendSize, 1000, chartActualProduction, 'IDLegendActualProduzione')
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
query += 'FROM "' + entityName + '" '
query += 'WHERE time > {1}ms and time < {2}ms GROUP BY time(10s) fill(previous)'

// ******************** GRAFICO PRODUZIONE ATTUALE ********************
common.actualDryerProduction(chartActualProduction, query, entityName)

// ******************** STORICO PRODUZIONI ********************
listHistoryProduction_new(entityName, timeStartHistory, timeEndHistory)

// Imposta il valore dei campi di INFO CELLA
setCellinfo(entityName)
setInterval(setCellinfo, 60000, entityName)
/*
per ora non funziona o non ci sono i campi dove vedere il valore.
setHistoryInfo(chartHistoryProduction)
setInterval(setHistoryInfo, 1000, chartHistoryProduction)
*/


$('#fullscreen').click(function () {
	//let url ='61_actualCellGraph.html?'+'entityName='+ entityName
	let url = './61_dryers_actual_zoom.html?' + 'entityName=' + entityName
	window.open(url, '_blank')
})


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

// Funzione che imposta i dati della cella nei rispettivi campi
function setCellinfo(entityName) {
	$('.lds-dual-ring.info-cell').show()
	// Recupera le informazioni della cella
	tw.getCellInfo(entityName).then(dryer => {
		// Imposta i valori dei vari tile con i dati recuperati da thingworx
		$("#cell_number").text("Dryer " + dryer.numero_cella);
		$("#number_trolleys").text(dryer.numero_carrelli);
		$("#cell_status").text(dryer.stato_cella);
		$("#recipe").text(dryer.nome_ricetta);
		//$("#recipe").text(dryer.numero_ricetta + " - " + dryer.nome_ricetta);
		$("#total_time_recipe").text(dryer.tempo_ricetta_programmato);
		$("#phase_time_recipe").text(dryer.tempo_ricetta_trascorso);
		//$("#IDNumeroCarrelli").text(dryer.numero_carrelli);
		setTimeout(function () { $('.lds-dual-ring.info-cell').hide() }, 1000);

	})
}

// Funzione che recupera i dati di ricetta dell'essicazione selezionata
// Viene calcolata la temperatura media, min e max
// Viene calcolata l'umidità media, min e maxc
function setHistoryInfo(chart) {
	try {
		// Dichiara le variabili
		let temp = [];
		let umid = [];
		// Effettua un ciclo per ogni punto del grafico
		chart.data.forEach(el => {
			// Aggiungi i dati della temperatura al grafico, ignora i valori uguali a NaN
			el.PV_Temperatura_Ambiente = parseFloat(el.PV_Temperatura_Ambiente)
			if (!Number.isNaN(el.PV_Temperatura_Ambiente)) { temp.push(el.PV_Temperatura_Ambiente) }
			// Aggiungi i dati dell'umidità al grafico, ignora i valori uguali a NaN
			el.PV_Umidita_Ambiente = parseFloat(el.PV_Umidita_Ambiente)
			if (!Number.isNaN(el.PV_Umidita_Ambiente)) { umid.push(el.PV_Umidita_Ambiente) }
		})
		// Dichiara la funzione della media matematica e la associa alla variabile arrAvg
		let arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length
		// Effettua la media sul valore di temperatura ambientale, recupera anche il valore minimo ed il valore massimo
		$("#IDTemperaturaMedia").text(arrAvg(temp).toFixed(2) + " °C")
		$("#IDTemperaturaMediaMax").text("Max: " + Math.max(...temp) + " °C")
		$("#IDTemperaturaMediaMin").text("Min: " + Math.min(...temp) + " °C")
		// Effettua la media sul valore di umidità ambientale, recupera anche il valore minimo ed il valore massimo
		$("#IDUmiditaMedia").text(arrAvg(umid).toFixed(2) + " %H")
		$("#IDUmiditaMediaMax").text("Max: " + Math.max(...umid) + " %H")
		$("#IDUmiditaMediaMin").text("Min: " + Math.min(...umid) + " %H")
		// Recupera le kcal consumate per il ciclo di essiccazione selezionato dalla lista dello storico
		try { $("#IDCalorieTotali").text(chart.data[chart.data.length - 1].PV_Consumo_Ciclo + " kcal") } catch (e) { }
		// Recupera i dati di ricetta
		tw.getCellHistoryRecipe(entityName, chart.data[0].time, chart.data[chart.data.length - 1].time).then(recipe => {
			// Svuota la tabella della ricetta
			$('#IDHistoryTableRecipeBody').empty();
			// Per ogni dato recuperato viene generata una riga nella tabella
			recipe.rows.forEach(el => {
				// Definisce l'html della riga da aggiungere
				let row = '<tr class="hover_tr" style="border-style: none;background: var(--bs-table-bg);">'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.Fase + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.tempo_fase + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.delta_T + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.temperatura + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.umidita + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.hz_inverter + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.tempo_ventilazione + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.tempo_pausa + '</td>'
				row += '</tr>'
				// Aggiunge la riga alla tabella
				$('#IDHistoryTableRecipeBody').append(row);
			})
		})
	} catch (e) { }
}

/***funzione per grafico storico */
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
// funzione per mostrare uno spinner mentre la tabella si carica
function showSpinnerTable() {
	$('.spinner-border').show(); // Show the spinner
	$('.tableDiv').css('opacity', '0.5'); // 
}
// funzione per nascondere lo spinner dopo il caricamento della tabella
function hideSpinnerTable() {
	$('.spinner-border').hide(); // Show the spinner
	$('.tableDiv').css('opacity', '1'); // 
}

function listHistoryProduction_new(entityName, timeStart, timeEnd) {
	// eseguire la funzione 
	showSpinnerTable()
	$("#IDHistoryTableBody").empty()
	console.log(entityName)
	let dryer_name = entityName.split(".")
	dryer_name = dryer_name[4] + " " + dryer_name[5]
	console.log(dryer_name)
	// Recupera lo storico delle lavorazioni effettuate dalla cella
	tw.service_03_getDryerHistoryProductions(entityName, timeStart, timeEnd)
		.then(productions => {
			// Per ogni ricetta trovata genera una nuova riga nella tabella
			productions.rows.forEach((el, i) => {
				// Converte il timestamp in Date
				let start = new Date(el.timeStart).toLocaleString();
				let end = new Date(el.timeEnd).toLocaleString();
				// Definisce l'id della riga della tabella
				let id = "IDHistoryTableRow" + i;
				// Definisce l'html della riga da aggiungere
				let row = '<tr id=' + id + ' class="hover_tr" style="border-style: none;background: var(--bs-table-bg);">'
				row += '    <td style="font-size: 12px;border-style: none;">' + start + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + end + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.ricetta + '</td>'
				row += '    <td style="font-size: 12px;border-style: none;">' + el.durata + '</td>'
				//row    += '    <td style="font-size: 12px;border-style: none;">' + dryer_name  + '</td>'
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
					// Aggiunge la classe table-primary alla riga seleziona e la rimuove dalle altre righe
					$(this).addClass('table-primary').siblings().removeClass('table-primary')
					// Definisce la query da inviare a influxdb
					let subquery = query.replaceAll('{1}', timestampStart).replaceAll('{2}', timestampEnd).replaceAll('{3}', entityName)
					// Recupera i dati da influxdb e li visualizza sul grafico
					am.setChartData(chartHistoryProduction, subquery, '')
					timeStartZoom = timestampStart
					timeEndZoom = timestampEnd
					// pulsante per aprire il grafico storico delle celle in un'altro tab
					$('#fullscreenHistory').click(function () {
						//let url ='60_cellGrapHistory.html?'+'entityName='+ entityName  +'&timeStart=' + timeStartZoom  + '&timeEnd=' + timeEndZoom
						let url = '60_dryers_history_zoom.html?' + 'entityName=' + entityName + '&timeStart=' + timeStartZoom + '&timeEnd=' + timeEndZoom
						window.open(url, '_blank')
					})
					tw.service_05_getDryerStartEnd(entityName, timestampStart, timestampEnd)
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
