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
let chartActualProduction = am.createXYChart("IDTrendActualProduction", 'IDLegendActualProduzione', 0, 2, arrayUM)
let chartHistoryProduction = am.createXYChart("IDTrendHistoryProduction", 'IDLegendHistoryProduction', 0, 2, arrayUM)
// Crea le series da visualizzare nel grafico
am.createLineSeries(chartHistoryProduction, "PV - Impasto", "time", "PV_Impasto", "kg/h", 0, false, true)
am.createLineSeries(chartHistoryProduction, "SP - Impasto", "time", "SP_Impasto", "kg/h", 0, false, true)
am.createLineSeries(chartHistoryProduction, "PV - Pressione", "time", "PV_Pressione", "Bar", 0, false, false)
am.createLineSeries(chartHistoryProduction, 'PV - Telai/min', 'time', 'PV_Telai_Minuto', 'T/min', 1, false, false, true)
am.createLineSeries(chartHistoryProduction, 'SP - Corrente', 'time', 'PV_Corrente', 'A', 0, false, true)
am.createLineSeries(chartHistoryProduction, 'PV - Velocità', 'time', 'PV_Velocita', 'hz', 0, false, true)
am.createLineSeries(chartHistoryProduction, 'SP - Velocità', 'time', 'SP_Velocita', 'hz', 0, false, true)

// Ricalcola la dimensione del div della legenda - viene eseguito ogni secondo
setInterval(am.refreshLegendSize, 1000, chartHistoryProduction, 'IDLegendHistoryProduction')


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