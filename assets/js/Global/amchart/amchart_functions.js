import * as tw from '../Thingworx/thingworx_api_module.js'

/*
* ---------------------------------------
* For more information visit:
* https://www.amcharts.com/
*
* Documentation is available at:
* https://www.amcharts.com/docs/v4/
* ---------------------------------------
*/

// Am4core theme
am4core.options.queue = true;
am4core.options.minPolylineStep = 5

// Set di colori per le series dei grafici
let colorChart = [
	[
		// colori grafici per le celle
		am4core.color("#b70b0b"),// color for room temperature
		am4core.color("#e06b59"),// color light red for temperature PV
		am4core.color("#f70202"),// color red for temperature Sp
		am4core.color("#0056ed"),// color blue for room humidity
	  	am4core.color("#5e73e0"),// color light blue for humidity PV
		am4core.color("#1031ed"),// color blue for humidity set point
		am4core.color("#EEA700"),// colore per la calorie arancione
	// 	am4core.color("#2e7d32")
	],
	//colori per Dashbord cliente e dashboard linea
	[
		am4core.color("#0288d1"),// verde chiaro PV Impasto
		am4core.color("#512da8"),// verde scuro SP Impasto
		am4core.color("#8105E1"),//  viola chiaro per pressione
	],
	// colori per il Impasto
	[
		am4core.color("#fb8c00"),// verde chiaro PV Impasto
		am4core.color("#fdd835"),// verde scuro SP Impasto
		am4core.color("#8105E1"),//  viola chiaro per pressione
		am4core.color("#d3f3fc"),// colore per portata acqua PV
		am4core.color("#cde9f4"),// colore per portata acqua SP
		am4core.color("#e06b59"),// colore per temperatura acqua PV
		am4core.color("#f70202"),// colore per temperatura acqua SP
		am4core.color("#EEA700"),// colore per la calorie arancione

	],
	// colori per la pressa
	[
		am4core.color("#fb8c00"),// verde chiaro PV Impasto
		am4core.color("#fdd835"),// verde scuro SP Impasto
		am4core.color("#8105E1"),//  viola chiaro per pressione
		am4core.color("#e06b59"),// colore per temperatura cilindro PV
		am4core.color("#f70202"),// colore per temperatura cilindro SP
		am4core.color("#8C2F39"),// colore per temperatura testata PV
		am4core.color("#BD2C3D"),// colore per temperatura testata SP
		am4core.color("#EEA700"),// colore per la calorie arancione
	],
	// colori per la Avanzamento telai
	[
		am4core.color("#fb8c00"),// verde chiaro PV Impasto
		am4core.color("#fdd835"),// verde scuro SP Impasto
		am4core.color("#8105E1"),//  viola chiaro per pressione
	],
	// colori per la Pasta Instant
	[
		am4core.color("#fb8c00"),// verde chiaro PV Impasto
		am4core.color("#fdd835"),// verde scuro SP Impasto
		am4core.color("#8105E1"),//  viola chiaro per pressione
		am4core.color("#8C2F39"),// colore per temperatura testata PV
		am4core.color("#BD2C3D"),// colore per temperatura testata SP
	],
	// colori per Omnidryer
	[
		am4core.color("#fb8c00"),// verde chiaro PV Impasto
		am4core.color("#fdd835"),// verde scuro SP Impasto
		am4core.color("#8105E1"),//  viola chiaro per pressione
		am4core.color("#e06b59"),// colore per temperatura 1 PV
		am4core.color("#e06b59"),// colore per temperatura 2 PV
		am4core.color("#e06b59"),// colore per temperatura 3 PV
		am4core.color("#9B1321"),// colore per temperatura 1 SP
		am4core.color("#9B1321"),// colore per temperatura 2 SP
		am4core.color("#9B1321"),// colore per temperatura 3 SP
		am4core.color("#0056ed"),// colore per umidità 1 PV
		am4core.color("#0056ed"),// colore per umidità 2 PV
		am4core.color("#0056ed"),// colore per umidità 3 PV
		am4core.color("#5e73e0"),// colore per umidità	1 SP
		am4core.color("#5e73e0"),// colore per umidità	2 SP
		am4core.color("#5e73e0"),// colore per umidità	3 SP
	],
	//	colori per Trabatto
	[
		am4core.color("#fb8c00"),// verde chiaro PV Impasto
		am4core.color("#fdd835"),// verde scuro SP Impasto
		am4core.color("#8105E1"),//  viola chiaro per pressione
		am4core.color("#e06b59"),// colore per temperatura 1 PV
		am4core.color("#9B1321"),// colore per temperatura 2 SP

	],
	// colori per avanzamento telai
	[
		am4core.color("#fb8c00"),// verde chiaro PV Impasto
		am4core.color("#fdd835"),// verde scuro SP Impasto
		am4core.color("#8105E1"),//  viola chiaro per pressione
		am4core.color("#C25012"),//  viola chiaro per pressione
		am4core.color("#9B3802"),//  viola chiaro per pressione
		am4core.color("#8105E1"),//  viola chiaro per pressione
		am4core.color("#8105E1"),//  viola chiaro per pressione

	]


]

// Funzione per la creazione di un grafico
// IDdivChart  = ID del div che include il grafico
// IDdivLegend = ID del div che include la legenda
// typeColor   = indice per la scelta della colorazione del grafico [colorChart]
// numYAxis 	 = numero di assi Y
// YAxisUnits  = array con le unità di misura da visualizzare nei tooltip
function createXYChart(IDdivChart, IDdivLegend='', typeColor, numYAxis=1, YAxisUnits=[], axisRange=false){

	// Instanzia il grafico di am4core
	let chart = am4core.create(IDdivChart, am4charts.XYChart);
	// Assegna al grafico il colore scelto
	chart.colors.list = colorChart[typeColor]
	// Abilita il cursore nel grafico
	chart.cursor = new am4charts.XYCursor()
	chart.cursor.behavior = "panX";
	// Abilita scrollbar
	//chart.scrollbarX = new am4core.Scrollbar()
	// Abilita la legenda nel grafico
	chart.legend = new am4charts.Legend();
	// Se la variabile contiene l'id del div della legenda
	// imposta il grafico con una legenda separa in un atro div
	if(IDdivLegend !== ''){
		let legendContainer = am4core.create(IDdivLegend, am4core.Container);
		legendContainer.width = am4core.percent(100);
		legendContainer.height = am4core.percent(100);
		chart.legend.parent = legendContainer;
	}
	// ***** Settaggio impostazioni legenda
	chart.legend.labels.template.fontSize = 12;
	chart.legend.labels.template.propertyFields.fill = "stroke";
	chart.legend.valueLabels.template.fontSize = 12;
	chart.legend.valueLabels.template.propertyFields.fill = "stroke";
	chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss Z";
	// ***** Settaggio impostazioni legenda
	var marker = chart.legend.markers.template.children.getIndex(0);
	marker.width = 8;
	marker.height = 8;
	marker.cornerRadius(50,50,50,50);
	marker.verticalCenter = "center";
	marker.horizontalCenter = "center";
	// ***** Settaggio impostazioni ASSE X
	let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.groupData = true;
	dateAxis.groupCount = 1000;
	dateAxis.renderer.minGridDistance = 50;
	dateAxis.renderer.grid.template.strokeOpacity = 0;
	dateAxis.renderer.labels.template.fill = am4core.color("#698ca7BF");
	dateAxis.renderer.labels.template.fontSize = 12;
	// ***** Settaggio impostazioni ASSE X
	let dateAxisTooltip = dateAxis.tooltip;
	dateAxisTooltip.background.fill = am4core.color("#698ca7");
	dateAxisTooltip.background.strokeWidth = 0;
	dateAxisTooltip.background.cornerRadius = 3;
	dateAxisTooltip.background.pointerLength = 0;
	dateAxisTooltip.label.fontSize = 10;
	dateAxisTooltip.dy = 5;
	// ***** Creazione axis range
	let event = dateAxis.axisRanges.create();
	let event1 = dateAxis.axisRanges.create();
	let event2 = dateAxis.axisRanges.create();

	// Crea tanti assi quanti ne sono stati impostati, di default 1
	for(let i=0; i<numYAxis; i++){
		// ***** Settaggio impostazioni ASSE Y
		let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
		try{ valueAxis.title.text = YAxisUnits[i]; }catch(e){}
		valueAxis.title.fontSize = 12
		valueAxis.title.fill = am4core.color("#698ca7BF");
		if(i>0){valueAxis.renderer.opposite = true;}
		valueAxis.renderer.labels.template.fill = am4core.color("#698ca7BF");
		valueAxis.renderer.labels.template.fontSize = 12;
		// ***** Settaggio impostazioni ASSE Y
		let valueAxisTooltip = valueAxis.tooltip;
		valueAxisTooltip.background.fill = am4core.color("#698ca7");
		valueAxisTooltip.background.strokeWidth = 0;
		valueAxisTooltip.background.cornerRadius = 3;
		valueAxisTooltip.background.pointerLength = 0;
		valueAxisTooltip.label.fontSize = 10;
		valueAxisTooltip.dy = 5;
	}

	// Richiede un tap sul grafico per abilitare le funzioni come pan, zoom, etc.
	// Dopo 3s di inattività il grafico viene disattivato nuovamente
	chart.tapToActivate = true
	chart.tapTimeout = 3000

	// Ritorna il grafico
	return chart
}

function createPieChart(IDdivChart){
	// Themes begin
	//am4core.useTheme(am4themes_animated)
	// Themes end

	// Create chart instance
	let chart = am4core.create(IDdivChart, am4charts.PieChart)

	chart.hiddenState.properties.radius = am4core.percent(0)

	return chart
}

function refreshLegendSize(chart, IDdivLegend){
	let id = '#' + IDdivLegend
	$(id).height(chart.legend.contentHeight)
}

function createXYChartNoLegend(IDdivChart, typeColor){
	// AMCHART - Create chart instance
	let chart = am4core.create(IDdivChart, am4charts.XYChart);

	chart.colors.list = colorChart[typeColor]
	// AMCHART - Cursor
	chart.cursor = new am4charts.XYCursor();
	chart.cursor.behavior = "none";

	chart.paddingTop = 0;
	chart.paddingRight = 0;
	chart.paddingBottom = 0;
	chart.paddingLeft = 0;

	// AMCHART - Legend
	chart.legend = new am4charts.Legend();
	chart.legend.disable = true;
	chart.legend.maxHeight  = 0;
	chart.legend.labels.template.fontSize = 0;
	chart.dateFormatter.inputDateFormat = "yyyy-MM-dd HH:mm:ss Z";

	// AMCHART - Create axes X
	let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
	dateAxis.renderer.labels.template.disabled = true;
	dateAxis.renderer.grid.template.disabled = true;

	// AMCHART - Configure axis tooltip
	let dateAxisTooltip = dateAxis.tooltip;
	dateAxisTooltip.background.fill = am4core.color("#698ca7");
	dateAxisTooltip.background.strokeWidth = 0;
	dateAxisTooltip.background.cornerRadius = 3;
	dateAxisTooltip.background.pointerLength = 0;
	dateAxisTooltip.label.fontSize = 10;
	dateAxisTooltip.dy = 5;

	// AMCHART - Create axes Y
	let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.labels.template.fill = am4core.color("#698ca7BF");
	valueAxis.renderer.labels.template.disabled = true;
	valueAxis.renderer.grid.template.disabled = true;
	// AMCHART - Configure axis tooltip
	let valueAxisTooltip = valueAxis.tooltip;
	valueAxisTooltip.background.fill = am4core.color("#698ca7");
	valueAxisTooltip.background.strokeWidth = 0;
	valueAxisTooltip.background.cornerRadius = 3;
	valueAxisTooltip.background.pointerLength = 0;
	valueAxisTooltip.label.fontSize = 10;
	valueAxisTooltip.dy = 5;

	// Richiede un tap sul grafico per abilitare le funzioni come pan, zoom, etc.
	// Dopo 3s di inattività il grafico viene disattivato nuovamente
	chart.tapToActivate = true
	chart.tapTimeout = 3000

	return chart;
}

function createColumnSeries(chart, seriesName, labelX, labelY, UM, yAxis=0){
	let series = chart.series.push(new am4charts.ColumnSeries())
	series.dataFields.valueY = labelY
	series.dataFields.dateX = labelX
	series.strokeWidth = 1
	series.minBulletDistance = 10
	series.stacked = true
	series.tooltip.label.fontSize = 10;
	series.tooltip.background.cornerRadius = 8
	series.tooltip.background.fillOpacity = 0.8
	series.columns.template.tooltipText = "{name}: {valueY} " + UM
	series.legendSettings.labelText = "{name}[/]"
	series.legendSettings.valueText = "{valueY.close} " + UM
	series.legendSettings.itemValueText = "[bold]{valueY} " + UM + "[/bold]"
	series.name = seriesName
	series.hidden = false
	series.connect = false
	series.yAxis = chart.yAxes.values[yAxis]
	series.columns.template.column.cornerRadiusTopLeft = 10
	series.columns.template.column.cornerRadiusTopRight = 10
}

function createLineSeries(chart, seriesName, labelX, labelY, UM, yAxis=0, EnableBullet=false, hidden=false, EnableScrollbar=false, tension=1){
	let series = chart.series.push(new am4charts.LineSeries());
	series.dataFields.valueY = labelY;
	series.dataFields.dateX = labelX;
	series.strokeWidth = 1;
	series.tooltipText = "{name}: [bold]{valueY} " + UM + "[/bold]";
	series.tooltip.label.fontSize = 10;
	series.minBulletDistance = 10;
	series.name = seriesName;
	series.tensionX = tension;
	series.yAxis = chart.yAxes.values[yAxis];
	series.hidden = hidden;

	if(EnableBullet){
		var bullet = series.bullets.push(new am4charts.CircleBullet());
		bullet.circle.stroke = am4core.color("#fff");
		bullet.circle.strokeWidth = 2;
	}

	if(EnableScrollbar){
		var scrollbarX = new am4charts.XYChartScrollbar()
		scrollbarX.series.push(series)
		chart.scrollbarX = scrollbarX
	}

	return series;
}

function createPieSeries(chart, seriesName, categoryName, unitName, totalUnit){
	// Add and configure Series
	var pieSeries = chart.series.push(new am4charts.PieSeries());
	pieSeries.dataFields.value = seriesName;
	pieSeries.dataFields.category = categoryName;
	pieSeries.dataFields.unit = unitName;
	pieSeries.innerRadius = am4core.percent(90);
	pieSeries.slices.template.stroke = am4core.color("#fff");
	pieSeries.slices.template.strokeOpacity = 1;
	pieSeries.slices.template.propertyFields.fill = "color";

	pieSeries.labels.template.text = "{category}: {value.value} {unit}";

	// This creates initial animation
	pieSeries.hiddenState.properties.opacity = 1
	pieSeries.hiddenState.properties.endAngle = -90
	pieSeries.hiddenState.properties.startAngle = -90

	let label = chart.seriesContainer.createChild(am4core.Label);
	label.horizontalCenter = "middle";
	label.verticalCenter = "middle";

	label.adapter.add("text", function(text, target){
		let value = pieSeries.dataItem.values.value.sum
		try{
			value = pieSeries.dataItem.values.value.sum.toFixed(2)
		}catch(e){}
		return "[font-size:18px]total[/]:\n[bold font-size:30px]" + value + " " + totalUnit + "[/]";
	})
}
// Inserisce i dati nel grafico
// I dati vengono recuperati tramite un servizio di thingworx che effettua query ad influxdb
function setChartData(chart, query, ringclass) {
	// Mostra l'icona di caricamento del grafico
	$(ringclass).show()
	// Definisce la variabile come array
	let data = []
	// recupera i dati da influxdb

	tw.influxQuery(query)
	.then(response => {
		console.log(response.results[0].series[0].values)
		// Aggiunge una riga all'array data
		response.results[0].series[0].values.forEach(el => {
			// Definisce la variabile come json object
			let obj  = {}
			// Aggiunge le chiavi-valore all'oggetto json obj
			// Le chiavi sono le colonne della query di influxdb
			response.results[0].series[0].columns.forEach((key, id) => {
				// controllo che il valore ritornato sia un numero
				if(typeof(el[id]) == "number"){
					// Riduco la precisione a 2 valori decimali
					el[id] = el[id].toFixed(2)
				}
				// Converte la stringa in timestamp
				if(id == 0){
					// Riduco la precisione a 2 valori decimali
					el[id] = Date.parse(el[id])
				}
				//Aggiungo il valore all'oggetto obj
				obj[key] = el[id]
			});
			// Aggiungi il json all'array
			data.push(obj)
		});
		// Nasconde l'icona del caricamento alla fine delle funzione + 1s dopo
		setTimeout(function() {	$(ringclass).hide() }, 1000)
		// Ritorna l'array dei dati
		chart.data = data
	})
}

// La funzione permette di esportare il grafico selezionato
function getExport(chart){
	chart.exporting.export("png")
}


export {createXYChart, createPieChart, refreshLegendSize, createXYChartNoLegend, createColumnSeries, createLineSeries, createPieSeries, setChartData, getExport}
