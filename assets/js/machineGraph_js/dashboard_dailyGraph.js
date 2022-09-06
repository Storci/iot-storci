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

	// ***** GRAFICO QUANTITA PRODUZIONE GIORNALIERA *****
	timeStart = new Date()
	// Imposta l'ora a mezzanotte del giorno attuale
	timeStart.setHours(0,0,0,0)
	// Imposta l'ora a mezzanotte del giorno attuale
	timeStart.setDate(-30)
	// Imposta i timestamp un'ora prima e un'ora dopo
	timeStart = Number(timeStart.getTime())
    //Definisci la variabili
    let query
	// Instazia il grafico della linea
	let chart = am.createXYChart("IDtrendProductQuantity", 'IDLegendProductQuantity', 1);
	// Crea le series da visualizzare nel grafico
	am.createColumnSeries(chart, "Quantità Impasto", "time", "productQuantity", "kg")
	// Definisce la query da inviare a influxdb
	query  = 'SELECT '
	query += 'SUM("Impasto") as "productQuantity" '
	query += 'FROM ( SELECT mean("Impasto_PV_Impasto_Totale") / 60 as "Impasto" '
	query += 'FROM "' + entityName + '" '
	query += 'WHERE time > ' + timeStart + 'ms and time < ' + timeEnd + 'ms GROUP BY time(1m) fill(0)) '
	query += 'GROUP BY time(24h)'
	// Inserisce i dati nel grafico
	setChartData(chart, query,)
	// Funzioni cicliche
	setInterval(setChartData, 600000, chart, query);	// ogni 10 min
	// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
	setInterval(am.refreshLegendSize, 1000, chart, 'IDLegendProductQuantity')

	am.setChartData(chart, query,'')
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