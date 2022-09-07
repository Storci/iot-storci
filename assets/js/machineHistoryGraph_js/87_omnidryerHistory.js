// Carica le funzioni globali
import * as tw from "../Global/Thingworx/thingworx_api_module.js"
import * as am from "../Global/amchart/amchart_functions.js"
import * as fb from "../Global/Firebase/firebase_auth_module.js"
import * as lang from "../Global/Common/Translation.js"
import * as common from "../Global/Common/commonFunctions.js"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)

// Recupera l'entity name della thing
// Recupera l'entity name della thing
let entityName = urlParams.get('entityName')
let timeStartZoom = new Date(urlParams.get('timeStart'))
console.log(timeStartZoom)
let timeEndZoom = new Date(urlParams.get ('timeEnd'))
console.log(timeEndZoom)

let arrayUM = ['Produzione (kg/h)', 'Pressione Estrusore (Bar)']
//let chartActualProduction = am.createXYChart("IDTrendActualProduction", 'IDLegendActualProduzione', 6, 7, arrayUM)
let chartHistoryProduction = am.createXYChart("IDTrendHistoryProduction", 'IDLegendHistoryProduction', 6, 7, arrayUM)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartActualProduction, "PV - Impasto", "time", "PV_Impasto", "kg/h", 6, false, true, true)
am.createLineSeries(chartActualProduction, "SP - Impasto", "time", "SP_Impasto", "kg/h", 6, false, true)
am.createLineSeries(chartActualProduction, "PV - Pressione", "time", "PV_Pressione", "Bar", 6, false, false)
am.createLineSeries(chartActualProduction, "PV - Temperatura 1", "time", "PV_Temp_Tunnel_1", "°C", 6, false, false)
am.createLineSeries(chartActualProduction, "PV - Temperatura 2", "time", "PV_Temp_Tunnel_2", "°C", 6, false, false)
am.createLineSeries(chartActualProduction, "PV - Temperatura 3", "time", "PV_Temp_Tunnel_3", "°C", 6, false, false)
am.createLineSeries(chartActualProduction, "SP - Temperatura 1", "time", "SP_Temp_Tunnel_1", "°C", 6, false, true)
am.createLineSeries(chartActualProduction, "SP - Temperatura 2", "time", "SP_Temp_Tunnel_2", "°C", 6, false, true)
am.createLineSeries(chartActualProduction, "SP - Temperatura 3", "time", "SP_Temp_Tunnel_3", "°C", 6, false, true)
am.createLineSeries(chartActualProduction, "PV - Umidità 1", "time", "PV_Hum_Tunnel_1", "%H", 6, false, false)
am.createLineSeries(chartActualProduction, "PV - Umidità 2", "time", "PV_Hum_Tunnel_2", "%H", 6, false, false)
am.createLineSeries(chartActualProduction, "PV - Umidità 3", "time", "PV_Hum_Tunnel_3", "%H", 6, false, false)
am.createLineSeries(chartActualProduction, "SP - Umidità 1", "time", "SP_Hum_Tunnel_1", "%H", 6, false, true)
am.createLineSeries(chartActualProduction, "SP - Umidità 2", "time", "SP_Hum_Tunnel_2", "%H", 6, false, true)
am.createLineSeries(chartActualProduction, "SP - Umidità 3", "time", "SP_Hum_Tunnel_3", "%H", 6, false, true)

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
query += 'mean("Omnidryer_Tunnel_PV_Temperatura_1") as "PV_Temp_Tunnel_1", '
query += 'mean("Omnidryer_Tunnel_PV_Temperatura_2") as "PV_Temp_Tunnel_2", '
query += 'mean("Omnidryer_Tunnel_PV_Temperatura_3") as "PV_Temp_Tunnel_3", '
query += 'mean("Omnidryer_Tunnel_SP_Temperatura_1") as "SP_Temp_Tunnel_1", '
query += 'mean("Omnidryer_Tunnel_SP_Temperatura_2") as "SP_Temp_Tunnel_2", '
query += 'mean("Omnidryer_Tunnel_SP_Temperatura_3") as "SP_Temp_Tunnel_3", '
query += 'mean("Omnidryer_Tunnel_PV_Umidità_1") as "PV_Hum_Tunnel_1", '
query += 'mean("Omnidryer_Tunnel_PV_Umidità_2") as "PV_Hum_Tunnel_2", '
query += 'mean("Omnidryer_Tunnel_PV_Umidità_3") as "PV_Hum_Tunnel_3", '
query += 'mean("Omnidryer_Tunnel_SP_Umidità_1") as "SP_Hum_Tunnel_1", '
query += 'mean("Omnidryer_Tunnel_SP_Umidità_2") as "SP_Hum_Tunnel_2", '
query += 'mean("Omnidryer_Tunnel_SP_Umidità_3") as "SP_Hum_Tunnel_3" '
query += 'FROM "' + entityName + '" '
query += 'WHERE time > '+ timeStartZoom.getTime() + 'ms and time < '+ timeEndZoom.getTime() + 'ms GROUP BY time(10s) fill(previous)'

// ******************** STORICO PRODUZIONI ********************
common.historyLineProduction(chartHistoryProduction, query, entityName)
