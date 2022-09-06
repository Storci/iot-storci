import * as tw from "../Global/Thingworx/thingworx_api_module.js"
import * as am from "../Global/amchart/amchart_functions.js"
import * as lang from "../Global/Common/Translation.js"
import * as common from "../Global/Common/commonFunctions.js"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let entityName = urlParams.get('entityName')


// Definisce le variabili come date
let timeStart = new Date()
let timeEnd   = new Date()
// Imposta l'ora a mezzanotte del giorno attuale
timeStart.setHours(7,0,0,0)
// Imposta i timestamp un'ora prima e un'ora dopo
timeStart = Number(timeStart.getTime()) - 3600000
timeEnd   = Number(timeEnd.getTime()) + 3600000
// Definisce la variabile
let query;
let chartActualProduction = am.createXYChart("IDtrendProduction", 'IDLegendProduction', 1, 2, ['Produzione Oraria', 'Pressione Estrusore'])
	// Crea le series da visualizzare nel grafico
	am.createLineSeries(chartActualProduction, "PV - Impasto", "time", "PV_Impasto", "kg/h", 0, true, false, true, 0.77)
	am.createLineSeries(chartActualProduction, "SP - Impasto", "time", "SP_Impasto", "kg/h", 0, false, false, false, 0.77)
	am.createLineSeries(chartActualProduction, "PV - Pressione", "time", "PV_Pressione", "Bar", 1, false, false, false, 0.77)

    setInterval(am.refreshLegendSize, 1000, chartActualProduction, 'IDLegendProduction')
	// Definisce la query da inviare a influxdb
    query  = 'SELECT '
	query += 'mean("Impasto_PV_Impasto_Totale") as "PV_Impasto", '
	query += 'mean("Impasto_SP_Impasto_Totale") as "SP_Impasto", '
	query += 'mean("Pressa_Motori_Estrusore_PV_Pressione") as "PV_Pressione" '
	query += 'FROM "' + entityName + '" '
	query += 'WHERE time > ' + timeStart + 'ms and time < ' + timeEnd + 'ms GROUP BY time(10s) fill(previous)'
	// Inserisce i dati nel grafico
	setChartData(chartActualProduction, query)
	// Funzioni cicliche
	setInterval(setChartData, 600000, chartActualProduction, query);	// ogni 10 min
	// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
	

    common.actualLineProduction(chartActualProduction, query, entityName)
    
    // Recupera i dati da influxdb tramite query.
// Inserisce i dati recuperati nel trend.
async function setChartData(chart, query) {
	// Definisce la variabile come array
	let data = [];
	// recupera li dati da influxdb
	let response = await tw.influxQuery(query);
	// Aggiunge una riga all'array data
	response.results[0].series[0].values.forEach(el => {
		// Definisce la variabile come json object
		let obj  = {};
		// Aggiunge le chiavi-valore all'oggetto json obj
		// Le chiavi sono le colonne della query di influxdb
		response.results[0].series[0].columns.forEach((key, id) => {
			// controllo che il valore ritornato sia un numero
			if(typeof(el[id]) == "number"){
				// Riduco la precisione a 2 valori decimali
				el[id] = el[id].toFixed(2);
			}
			//Aggiungo il valore all'oggetto obj
			obj[key] = el[id];
		});
		// Aggiungi il json all'array
		data.push(obj);
	});
	// Inserisce i dati nel grafico
	chart.data = data;
	console.log(response.results[0].series[0].values.length)
}