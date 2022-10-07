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

// Pulsanti per l'esportazione del grafico in png
$('#IDButtonExportTrendActualProduction').click(el => { am.getExport(chartActualProduction) })
$('#IDButtonExportTrendHistoryProduction').click(el => { am.getExport(chartHistoryProduction) })

$('#fullscreen').click(function(){
	let url ='./machineGraph/78_pastaInstantGraph.html?'+'entityName='+ entityName
	window.open(url, '_blank')
})

// Grafico Card Telai Al Minuto

common.cardLineTrend('IDDivChart2', entityName, 'Pasta_Instant_PV_Temperatura_Camera', '', '°C')
common.cardLineTrend('IDDivChart3', entityName, 'Pasta_Instant_PV_Portata_Vapore', '', 'm3/h')

// ******************** GRAFICO PRODUZIONE ATTUALE ********************
common.actualLineProduction(chartActualProduction, query, entityName)

// ******************** STORICO PRODUZIONI ********************
common.historyLineProduction(chartHistoryProduction, query, entityName)

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
