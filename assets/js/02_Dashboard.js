import * as tw from "./Global/Thingworx/thingworx_api_module.js";
import * as am from "./Global/amchart/amchart_functions.js";
import * as fb from "./Global/Firebase/firebase_auth_module.js";
import * as lang from "./Global/Common/Translation.js";
import * as common from "./Global/Common/commonFunctions.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// richiamo funzione dello spinner
showSpinner()


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

//$('#modal1').modal("show");

// Recuperare i dati dalla memoria locale
let selectedCustomer = localStorage.getItem("global_selected_customer");
let selectedLine = localStorage.getItem("global_selected_line");
let entityName = urlParams.get('entityName');
console.log(entityName);

// Rimuovere i trattini bassi dal nome e dalla visualizzazione nel campo
$('#IDCustomerName').text(selectedCustomer.replace(/_/g, " "));
$("#IDBreadcrumbCustomer").text(selectedCustomer.replace(/_/g, ' '));

// Recupera la lingua utilizzata dall'utente e sostituisce tutti i testi
lang.getLanguage();

// Retrieve user name from firebase, check if logged in, if not, redirect to login page
fb.onAuthStateChanged_2();

$('#id-nav-dashboard').addClass('active');

//creare un array per tenere tutte le promesse
let promises = [];

//recupera i dati generici della linea
promises.push(
  tw.service_02_getLinesGeneralInfo(entityName).then(res => {
    console.log(res);
    if (res.array.length > 0) {
      res.array.forEach((item, i) => {
        createDivLine('#IDdivLinee', item.entityName);
        setLineCardsValue(entityName);
        setInterval(setLineCardsValue, 10000, entityName);

        let arrayUM = ['Produzione (kg)'];
        let id = 'ID' + item.entityName.replace(/\./g, '');
        let idLegend = id + 'Legend';
        let idTrend = id + 'Trend';
        let chart = am.createXYChart(idTrend, idLegend, 1, 2, arrayUM);

        am.createColumnSeries(chart, "Daily Production", "time", "daily_production", "kg");
        setInterval(am.refreshLegendSize, 1000, chart, idLegend);

        let query = `SELECT SUM("Impasto") as "daily_production" FROM (SELECT mean("Impasto_PV_Impasto_Totale") / 60 as "Impasto" FROM "${item.entityName}" WHERE time >= now() - 5d and time <= now() GROUP BY time(1m) fill(0)) GROUP BY time(24h)`;
        am.setChartData(chart, query, '');

        $('[chart="chartLine"]').click(function () {
          let days = $(this).attr('value');
          $(this).addClass('active').siblings().removeClass('active');
          let query = `SELECT SUM("Impasto") as "daily_production" FROM (SELECT mean("Impasto_PV_Impasto_Totale") / 60 as "Impasto" FROM "${item.entityName}" WHERE time >= now() - ${days}d and time <= now() GROUP BY time(1m) fill(0)) GROUP BY time(24h)`;
          am.setChartData(chart, query, '');
        });
      });
    } else {
      $('#IDdivLinee').addClass('d-none');
    }
    console.log("finished loading lines");
  }).catch(e => {
    console.warn(e);
    $('#IDdivLinee').addClass('d-none');
  })
);

// recupera i dati generici della cella
promises.push(
  tw.service_01_getDryersGeneralInfo(entityName).then(res => {
    console.log(res);
    if (JSON.stringify(res) !== '{}') {
      createDivDryers('#IDdivDryers', entityName);
      setDryersCardsValue(entityName);
      setInterval(setDryersCardsValue, 10000, entityName);

      let arrayUM = ['Consumo Giornaliero (kcal)', 'Celle Attive'];
      let id = 'ID' + res.entityName.replace(/\./g, '');
      let idLegend = id + 'Legend';
      let idTrend = id + 'Trend';

      let chart = am.createXYChart(idTrend, idLegend, 1, 2, arrayUM);
      am.createColumnSeries(chart, "Active Dryers", "time", "dryers_actived", '', 1);
      am.createLineSeries(chart, "Daily Consumption", "time", "kcal", "kcal", 0, true, false, false, 0.77);
      setInterval(am.refreshLegendSize, 1000, chart, idLegend);

      let dryersEntityName = `/${entityName}.*.Cella.*/`;
      let query = `SELECT mean("Dati_Aggiuntivi_Kcal_H") as "kcal" FROM ${dryersEntityName} WHERE time >= now() - 5d and time <= now() GROUP BY time(24h) fill(0)`;
      setDryersTrend(chart, query);

      $('[chart="chartDryers"]').click(function () {
        let days = $(this).attr('value');
        $(this).addClass('active').siblings().removeClass('active');
        let query = `SELECT mean("Dati_Aggiuntivi_Kcal_H") as "kcal" FROM ${dryersEntityName} WHERE time >= now() - ${days}d and time <= now() GROUP BY time(24h) fill(0)`;
        setDryersTrend(chart, query);
      });
    } else {
      $('#IDdivDryers').addClass('d-none');
    }
    console.log("finished loading dryers");
  }).catch(e => {
    $('#IDdivDryers').addClass('d-none');
    console.warn(e);
  })
);

// attende che tutti promise siano risolte
Promise.all(promises).then(() => {
  // $('#modal1').modal("hide");
  hideSpinner()
  console.log("All data loaded");
}).catch(error => {
  console.error("Error loading data", error);
  //$('#modal1').modal("hide");
  hideSpinner()
});

// funzione che imposta i valori per le card delle celle
function setLineCardsValue(entityName) {
  tw.service_02_getLinesGeneralInfo(entityName)
    .then(result => {
      result.array.forEach((item, i) => {
        let keyProperty = item.entityName.replace(/\./g, '');
        keyProperty = keyProperty.toLowerCase();
        let key = `[${keyProperty}]`;
        $(key).each(function () {
          $(this).text(item[$(this).attr(keyProperty)]);
        });
      });
    })
    .catch(error => console.error(error));
}

// funzione che imposta i valori per le card delle celle
function setDryersCardsValue(entityName) {
  tw.service_01_getDryersGeneralInfo(entityName)
    .then(result => {
      if (result.entityName) {
        let keyProperty = result.entityName.replace(/\./g, '');
        keyProperty = keyProperty.toLowerCase();
        let key = `[${keyProperty}]`;
        $(key).each(function () {
          $(this).text(result[$(this).attr(keyProperty)]);
        });
      }
    })
    .catch(error => console.error(error));
}

// Funzione di impostazione dei dati di tendenza delle celle
function setDryersTrend(chart, query) {
  tw.influxQuery(query)
    .then(response => {
      let data = [];
      response.results[0].series[0].values.forEach((el, id) => {
        let kcal_day_total = 0;
        let dryers = 0;
        response.results[0].series.forEach(serie => {
          if (serie.values[id][1] > 0) {
            dryers += 1;
            kcal_day_total += serie.values[id][1];
          }
        });
        data.push({
          time: el[0],
          kcal: kcal_day_total.toFixed(0),
          dryers_actived: dryers
        });
      });
      chart.data = data;
    })
    .catch(error => console.error(error));
}

// funzione che crea il div per le celle
function createDivDryers(IDdiv, entityName) {
  let keyProperty = entityName.replace(/\./g, '');
  let id = 'ID' + entityName.replace(/\./g, '');
  let html = '';

  html += '<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" data-pg-collapsed>'
  html += '<h1 class="h2 card-result" translate_id ="dryer">Dryer</h1>'
  html += '<div class="btn-toolbar mb-2 mb-md-0">'
  html += '<div class="btn-group me-2"></div>'
  html += '</div>'
  html += '</div>'
  html += '<div id="IDDryersData" class="row g-0 row-cols-1 row-cols-lg-4 d-flex gy-3" style="min-height: 300px;">'
  html += '<div class="col col-customer col-sx-padding">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 1.5rem;">'
  html += '<h6 class="text-muted card-subtitle mb-2" style="color: var(--bs-heading-medium-emphasis);font-size: 1rem;" translate_id="dryers_in_processing">Active Dryers</h6>'
  html += '<h4 class="card-title thingworx-property-value" ' + keyProperty + '="celle_attive" style="color: var(--bs-heading-high-emphasis);font-size: 1.2rem;">Title</h4>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '<div class="col col-customer col-padding">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 1.5rem;">'
  html += '<h6 class="text-muted card-subtitle mb-2" style="color: var(--bs-heading-medium-emphasis);font-size: 1rem;" translate_id="room_temperature">Room Temperature</h6>'
  html += '<h4 class="card-title thingworx-property-value" ' + keyProperty + '="temperatura_ambiente" style="color: var(--bs-heading-high-emphasis);font-size: 1.2rem;">Title</h4>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '<div class="col col-customer col-padding">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 1.5rem;">'
  html += '<h6 class="text-muted card-subtitle mb-2" style="color: var(--bs-heading-medium-emphasis);font-size: 1rem;" translate_id="room_humidity">Room Humidity</h6>'
  html += '<h4 class="card-title thingworx-property-value" ' + keyProperty + '="umidita_ambiente" style="color: var(--bs-heading-high-emphasis);font-size: 1.2rem;">Title</h4>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '<div class="col col-customer col-dx-padding">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 1.5rem;">'
  html += '<h6 class="text-muted card-subtitle mb-2" style="color: var(--bs-heading-medium-emphasis);font-size: 1rem;" translate_id="number_of_alarms">Number of Alarms Present</h6>'
  html += '<h4 class="card-title thingworx-property-value" ' + keyProperty + '="allarmi_attivi" style="color: var(--bs-heading-high-emphasis);font-size: 1.2rem;">Title</h4>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-customer" style="padding: 0px;">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 0px;padding-top: 16px;">'
  html += '<div style="padding-right: 16px;padding-left: 16px;">'
  html += '<h6 class="text-muted mb-2" style="color: var(--bs-heading-medium-emphasis);margin: 0px;font-size: 1rem;" translate_id="daily_production">Consumo Giornaliero</h6>'
  html += '</div>'
  html += '<div id="' + id + 'Legend"></div>'
  html += '<div id="' + id + 'Trend" style="min-height: 300px;max-height: 100%;"></div>'
  html += '<div class="d-flex justify-content-center" style="width: 100%;">'
  html += '<button id="' + id + '5d" class="btn btn-outline-primary active" type="button" style="margin: 5px; font-size: 12px;color: var(--bs-heading-medium-emphasis);" '
  html += 'value="5" chart="chartDryers"><span style="margin-right: 5px;font-size: 0.6rem;">5</span><span translate_id="days" style="font-size: 0.6rem;">Days</span></button>'
  html += '<button id="' + id + '10d" class="btn btn-outline-primary" type="button" style="margin: 5px; font-size: 12px;color: var(--bs-heading-medium-emphasis);" '
  html += 'value="10" chart="chartDryers"><span style="margin-right: 5px;font-size: 0.6rem;">10</span><span translate_id="days" style="font-size: 0.6rem;">Days</span></button>'
  html += '<button id="' + id + '30d" class="btn btn-outline-primary" type="button" style="margin: 5px; font-size: 12px;color: var(--bs-heading-medium-emphasis);" '
  html += 'value="30" chart="chartDryers"><span style="margin-right: 5px;font-size: 0.6rem;">30</span><span translate_id="days" style="font-size: 0.6rem;">Days</span></button>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '</div>'

  $(IDdiv).append(html);
  lang.getLanguage()
}

// funzione che genera il div per la linea
function createDivLine(IDdiv, entityName) {
  let keyProperty = entityName.replace(/\./g, '');
  let id = 'ID' + entityName.replace(/\./g, '');
  let html = '';

  html += '<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom" data-pg-collapsed>'
  html += '<h1 class="h2 card-result" translate_id ="line">Line</h1>'
  html += '<div class="btn-toolbar mb-2 mb-md-0">'
  html += '<div class="btn-group me-2"></div>'
  html += '</div>'
  html += '</div>'
  html += '<div id="IDdivLineData" class="row g-0 row-cols-1 row-cols-lg-3 gy-3" style="min-height: 300px;">'
  html += '<div class="col col-customer col-sx-padding">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 1.5rem;">'
  html += '<h6 class="text-muted card-subtitle mb-2" style="color: var(--bs-heading-medium-emphasis);font-size: 1rem;" translate_id="machine_status">Machine Status</h6>'
  html += '<h4 class="card-title" ' + keyProperty + '="stato_linea" style="color: var(--bs-heading-high-emphasis);font-size: 1.2rem;">Title</h4>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '<div class="col col-customer col-padding">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 1.5rem;">'
  html += '<h6 class="text-muted card-subtitle mb-2" style="color: var(--bs-heading-medium-emphasis);font-size: 1rem;" translate_id="Recipe_set">Recipe Set</h6>'
  html += '<h4 class="card-title" ' + keyProperty + '="nome_ricetta" style="color: var(--bs-heading-high-emphasis);font-size: 1.2rem;">Title</h4>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '<div class="col col-customer col-dx-padding">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 1.5rem;">'
  html += '<h6 class="text-muted card-subtitle mb-2" style="color: var(--bs-heading-medium-emphasis);font-size: 1rem;" translate_id="number_of_alarms">Number Of Alarms Present</h6>'
  html += '<h4 class="card-title" style="color: var(--bs-heading-high-emphasis);font-size: 1.2rem;" ' + keyProperty + '="numero_allarmi">Title</h4>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 col-customer" style="padding: 0px;">'
  html += '<div class="card card-h-100" style="border-radius: 0px;">'
  html += '<div class="card-body" style="padding: 0px;padding-top: 16px;">'
  html += '<div style="padding-right: 16px;padding-left: 16px;">'
  html += '<h6 class="text-muted mb-2" style="color: var(--bs-heading-medium-emphasis);margin: 0px;font-size: 1rem;" translate_id="daily_production">Produzione Giornaliera</h6>'
  html += '</div>'
  html += '<div id="' + id + 'Legend"></div>'
  html += '<div id="' + id + 'Trend" style="min-height: 300px;max-height: 100%;"></div>'
  html += '<div class="d-flex justify-content-center" style="width: 100%;">'
  html += '<button id="' + id + '5d" class="btn btn-outline-primary active" type="button" style="margin: 5px; font-size: 12px;color: var(--bs-heading-medium-emphasis);" '
  html += 'value="5" chart="chartLine"><span style="margin-right: 5px;font-size: 0.6rem;">5</span><span translate_id="days" style="font-size: 0.6rem;">Days</span></button>'
  html += '<button id="' + id + '10d" class="btn btn-outline-primary" type="button" style="margin: 5px; font-size: 12px;color: var(--bs-heading-medium-emphasis);" '
  html += 'value="10" chart="chartLine"><span style="margin-right: 5px;font-size: 0.6rem;">10</span><span translate_id="days" style="font-size: 0.6rem;">Days</span></button>'
  html += '<button id="' + id + '30d" class="btn btn-outline-primary" type="button" style="margin: 5px; font-size: 12px;color: var(--bs-heading-medium-emphasis);" '
  html += 'value="30" chart="chartLine"><span style="margin-right: 5px;font-size: 0.6rem;">30</span><span translate_id="days" style="font-size: 0.6rem;">Days</span></button>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '</div>'
  html += '</div>'

  $(IDdiv).append(html);
  lang.getLanguage()
}