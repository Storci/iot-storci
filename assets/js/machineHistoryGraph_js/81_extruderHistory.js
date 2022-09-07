// Carica le funzioni globali
import * as tw from "../Global/Thingworx/thingworx_api_module.js"
import * as am from "../Global/amchart/amchart_functions.js"
import * as fb from "../Global/Firebase/firebase_auth_module.js"
import * as lang from "../Global/Common/Translation.js"
import * as common from "../Global/Common/commonFunctions.js"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
// Recupera l'entity name della thing
let entityName = urlParams.get('entityName')
let timeStartZoom = new Date(urlParams.get('timeStart'))
console.log(timeStartZoom)
let timeEndZoom = new Date(urlParams.get ('timeEnd'))
console.log(timeEndZoom)

let arrayUM = ['Produzione (kg/h)', 'Pressione Estrusore (Bar)']
let chartHistoryProduction = am.createXYChart("IDTrendHistoryProduction", 'IDLegendHistoryProduction', 3, 4, arrayUM)
// Crea le series da visualizzare sul grafico
am.createLineSeries(chartHistoryProduction, "PV - Impasto", "time", "PV_Impasto", "kg/h", 3, false, true)
am.createLineSeries(chartHistoryProduction, "SP - Impasto", "time", "SP_Impasto", "kg/h", 3, false, true)
am.createLineSeries(chartHistoryProduction, "PV - Pressione", "time", "PV_Pressione", "Bar", 3, false, false, true)
am.createLineSeries(chartHistoryProduction, 'PV - Temperatura Cilindro', 'time', 'PV_Temp_Cilindro', '°C', 3, false, false)
am.createLineSeries(chartHistoryProduction, 'SP - Temperatura Cilindro', 'time', 'SP_Temp_Cilindro', '°C', 3, false, false)
am.createLineSeries(chartHistoryProduction, 'PV - Temperatura Testata', 'time', 'PV_Temp_Testata', '°C', 3, false, true)
am.createLineSeries(chartHistoryProduction, 'PV - Temperatura Testata', 'time', 'SP_Temp_Testata', '°C', 3, false, true)
am.createLineSeries(chartHistoryProduction, "PV - kcal/h", "time", "PV_Consumi", "kcal/h", 3, false, true)

// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
setInterval(am.refreshLegendSize, 1000, chartHistoryProduction, 'IDLegendHistoryProduction')

// Definisce la query da inviare a influxdb
// I parametri da sostituire sono indicati da {1}, {2}, ecc...
// Invece l'entityName è sempre comune per tutte le query
let query  = 'SELECT '
query += 'mean("Impasto_PV_Impasto_Totale") as "PV_Impasto", '
query += 'mean("Impasto_SP_Impasto_Totale") as "SP_Impasto", '
query += 'mean("Pressa_Motori_Estrusore_PV_Pressione") as "PV_Pressione", '
query += 'mean("Pressa_Termostatazione_Cilindro_PV_Temperatura") as "PV_Temp_Cilindro", '
query += 'mean("Pressa_Termostatazione_Cilindro_SP_Temperatura") as "SP_Temp_Cilindro", '
query += 'mean("Pressa_Termostatazione_Testata_PV_Temperatura") as "PV_Temp_Testata", '
query += 'mean("Pressa_Termostatazione_Testata_SP_Temperatura") as "SP_Temp_Testata", '
query += 'mean("Pressa_Motori_Estrusore_PV_Calorie") as "PV_Consumi" '
query += 'FROM "' + entityName + '" '
query += 'WHERE time > '+ timeStartZoom.getTime() + 'ms and time < '+ timeEndZoom.getTime() + 'ms GROUP BY time(10s) fill(previous)'


// ******************** STORICO PRODUZIONI ********************
common.actualLineProduction(chartHistoryProduction, query, entityName)