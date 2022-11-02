// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as am from "./Global/amchart/amchart_functions.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"
import * as common from "./Global/Common/commonFunctions.js"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

// Recupera l'entity name della thing
let entityName = urlParams.get('entityName')

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()

// Definisce le variabili come date
let timeStartHistory = new Date()
let timeEndHistory   = new Date()
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
}, function(start, end, label) {
  listHistoryProduction(entityName, start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
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
let arrayUM = ['Produzione (kg/h)', 'Pressione Estrusore (Bar)']
let chartActualProduction = am.createXYChart("IDTrendActualProduction", 'IDLegendActualProduzione', 5, 2, arrayUM)
let chartHistoryProduction = am.createXYChart("IDTrendHistoryProduction", 'IDLegendHistoryProduction', 5, 2, arrayUM)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartActualProduction, "PV - Impasto", "time", "PV_Impasto", "kg/h", 0, false, true, true)
am.createLineSeries(chartActualProduction, "SP - Impasto", "time", "SP_Impasto", "kg/h", 0, false, true)
am.createLineSeries(chartActualProduction, "PV - Pressione", "time", "PV_Pressione", "Bar", 1, false, false)
am.createLineSeries(chartActualProduction, "PV - Temperatura Camera", "time", "PV_Temp_Camera", "°C", 1, false, false)
am.createLineSeries(chartActualProduction, "PV - Portata Vapore", "time", "PV_Portata_Vapore", "°C", 1, false, false)
// Crea le series da visualizzare nel grafico
am.createLineSeries(chartHistoryProduction, "PV - Impasto", "time", "PV_Impasto", "kg/h", 0, false, true, true)
am.createLineSeries(chartHistoryProduction, "SP - Impasto", "time", "SP_Impasto", "kg/h", 0, false, true)
am.createLineSeries(chartHistoryProduction, "PV - Pressione", "time", "PV_Pressione", "Bar", 1, false, false)
am.createLineSeries(chartHistoryProduction, "PV - Temperatura Camera", "time", "PV_Temp_Camera", "°C", 1, false, false)
am.createLineSeries(chartHistoryProduction, "PV - Portata Vapore", "time", "PV_Portata_Vapore", "°C", 1, false, false)

// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
setInterval(am.refreshLegendSize, 1000, chartActualProduction, 'IDLegendActualProduzione')
setInterval(am.refreshLegendSize, 1000, chartHistoryProduction, 'IDLegendHistoryProduction')

// Definisce la query da inviare a influxdb
// I parametri da sostituire sono indicati da {1}, {2}, ecc...
// Invece l'entityName è sempre comune per tutte le query
let query  = 'SELECT '
query += 'mean("Impasto_PV_Impasto_Totale") as "PV_Impasto", '
query += 'mean("Impasto_SP_Impasto_Totale") as "SP_Impasto", '
query += 'mean("Pressa_Motori_Estrusore_PV_Pressione") as "PV_Pressione", '
query += 'mean("Pasta_Instant_PV_Temperatura_Camera") as "PV_Temp_Camera", '
query += 'mean("Pasta_Instant_PV_Portata_Vapore") as "PV_Portata_Vapore" '
query += 'FROM "' + entityName + '" '
query += 'WHERE time > {1}ms and time < {2}ms GROUP BY time(1m) fill(previous)'

// Cancella tutte le righe della tabella
$("#IDHistoryTableBody").empty()

// Recupera tutte le celle installate dal cliente
listHistoryProduction(entityName, timeStartHistory, timeEndHistory)


let direction = true
$("th").click(function() {
	let icon = "#" + $(this)[0].children[0].children[1].id
	$(".icon-table").addClass("d-none")
  $(icon).removeClass("d-none")

	if(direction){
		$(icon).text("expand_more")
	}else{
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


$("#filter").on("keyup", function(){
  let value = $(this).val()
  $("#IDHistoryTableBody tr").filter(function(){
    $(this).toggle($(this).text().indexOf(value) > -1)
  })
})


// ************************************
// ************ FUNCTIONS *************
// ************************************

function convertDate(s){
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

function insertionSort(table, column, dir){
	let rows = 	table.children
	let parent = table

	for(let i=1; i<rows.length; i++){
		for(let j=i-1; j>-1; j--){
			let value1 = rows[j].getElementsByTagName("TD")[column].innerHTML
			let value2 = rows[j+1].getElementsByTagName("TD")[column].innerHTML

			if(column == 0 || column == 1){
				value1 = convertDate(value1)
				value2 = convertDate(value2)
			}

			if(dir){
				if(value2 < value1){
					parent.insertBefore(rows[j+1], rows[j])
				}
			}else{
				if(value2 > value1){
					parent.insertBefore(rows[j+1], rows[j])
				}
			}
		}
	}
}


function listHistoryProduction(entityName, timeStart, timeEnd){
	$("#IDHistoryTableBody").empty()
	let line_name = entityName.toString().split(".")
	line_name = line_name[4] + " " + line_name[5]
	// Recupera lo storico delle lavorazioni effettuate dalla cella
	tw.service_04_getLineHistoryProductions(entityName, timeStart, timeEnd)
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
			row    += '    <td style="font-size: 12px;border-style: none;">' + start  + '</td>'
			row    += '    <td style="font-size: 12px;border-style: none;">' + end    + '</td>'
			row    += '    <td style="font-size: 12px;border-style: none;">' + el.ricetta + '</td>'
			row    += '    <td style="font-size: 12px;border-style: none;">' + el.durata  + '</td>'
		//	row    += '    <td style="font-size: 12px;border-style: none;">' + line_name  + '</td>'
			row    += '</tr>'
			// Aggiunge la riga alla tabella
			$("#IDHistoryTableBody").append(row)
			// Imposta i timestamp di inizio e fine essiccazione (il range temporale è allargato 30 min prima dell'inizio e 30 min dopo la fine)
			let timestampStart = el.timeStart - 1800000
			let timestampEnd   = el.timeEnd + 1800000
			// Controlla se la data è invalida, nel caso l'essiccazione è in corso e carica la data attuale
			if(timestampEnd == undefined || timestampEnd == null || timestampEnd == '' || Number.isNaN(timestampEnd)){
				timestampEnd = Date.now() + 1800000
			}

			id = "#" + id
			$(id).click(function(){
				// Aggiunge la classe table-primary alla riga seleziona e la rimuove dalle altre righe
				$(this).addClass('table-primary').siblings().removeClass('table-primary')
				// Definisce la query da inviare a influxdb
				let subquery = query.replaceAll('{1}', timestampStart).replaceAll('{2}', timestampEnd).replaceAll('{3}', entityName)
				// Recupera i dati da influxdb e li visualizza sul grafico
				am.setChartData(chartHistoryProduction, subquery, '')
				// Recupera la prima riga della tabella
				timeStartZoom = timestampStart
				timeEndZoom = timestampEnd
				// pulsante per aprire il grafico storico delle celle in un'altro tab
				$('#fullscreenHistoryPastaInstant').click(function(){
					let url ='./machineHistoryGraph/89_pasta_instant_history_zoom.html?'+'entityName='+ entityName  +'&timeStart=' + timeStartZoom  + '&timeEnd=' + timeEndZoom
					window.open(url, '_blank')
					console.log('me')
				})
			})
			/*let elem = document.getElementById('firstColumn')
			// Definisce la variabile come click event
				let clickEvent = new Event('click');
			// Esegue l'evento dell'elemento, in questo modo simula il click
			// sulla prima riga della tabella, e viene caricato il grafico
				elem.dispatchEvent(clickEvent)*/

			})
		})
	}

// Pulsanti per l'esportazione del grafico in png
$('#IDButtonExportTrendActualProduction').click(el => { am.getExport(chartActualProduction) })
$('#IDButtonExportTrendHistoryProduction').click(el => { am.getExport(chartHistoryProduction) })

$('#fullscreen').click(function(){
	let url ='./machineGraph/78_pasta_instant_actual_zoom.html?'+'entityName='+ entityName
	window.open(url, '_blank')
})

// Grafico Card Telai Al Minuto

common.cardLineTrend('IDDivChart2', entityName, 'Pasta_Instant_PV_Temperatura_Camera', '', '°C')
common.cardLineTrend('IDDivChart3', entityName, 'Pasta_Instant_PV_Portata_Vapore', '', 'm3/h')

// ******************** GRAFICO PRODUZIONE ATTUALE ********************
common.actualLineProduction(chartActualProduction, query, entityName)

// ******************** STORICO PRODUZIONI ********************
//common.historyLineProduction(chartHistoryProduction, query, entityName)

// ******************** RECUPERO DATI TW ********************
setCardsValue(entityName)
// Funzioni cicliche
setInterval(setCardsValue, 10000, entityName);	// ogni 10 sec


// Funzione che recupera i dati da thingworx e li visualizza nelle card della pagina.
// Prerequisiti: le label che si vogliono popolare con i valori da thingworx devono avere
// la seguente classe '.thingworx-property-value'.
// Inoltre ogni label deve avere una key chiamata 'propertyname', il valore della key deve essere
// uguale al nome della property di thingworx che ritorna il servizio.
async function setCardsValue(entityName){
  // Richiama il servizio di thingworx.
	tw.getLinePastaInstantInfo(entityName)
		.then(info => {
			// Assegna alle varie label il valore corretto recuperato da thingworx
			$('[propertyname]').each(function(){
        let value = 0
        if(typeof info[$(this).attr('propertyname')] == 'number'){
          value = info[$(this).attr('propertyname')].toFixed($(this).attr('decimals'))
        }else{
          value = info[$(this).attr('propertyname')]
        }
        $(this).text(value)
      })
		})
		.catch(error => console.error(error))
}
