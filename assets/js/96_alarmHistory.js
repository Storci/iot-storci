// Carica le funzioni globali
import * as tw from "./Global/Thingworx/thingworx_api_module.js"
import * as am from "./Global/amchart/amchart_functions.js"
import * as fb from "./Global/Firebase/firebase_auth_module.js"
import * as lang from "./Global/Common/Translation.js"
import * as common from "./Global/Common/commonFunctions.js"

// Recupera il nome dell'utente da firebase, controlla che sia loggato.
// Nel caso non fosse loggato richiama la pagina di login
fb.onAuthStateChanged_2()
// funzione per la traduzione
lang.getLanguage()

// recupero il nome del cliente utilizzando il local storage
let customerName = localStorage.getItem('global_customer')

// Definisce le variabili come date
let timeStartHistory = new Date()
let timeEndHistory   = new Date()
// Imposta X giorni prima della data odierna
timeStartHistory.setDate(timeStartHistory.getDate() - 2)
// Imposta i 2 data picker con le date calcolate prima
// La funzione getDate ritorna solamente l'anno, il mese e il giorno
// yyyy-MM-dd
let disp_timeStart = common.getDate(timeStartHistory)
let disp_timeEnd = common.getDate(timeEndHistory)

$('#dateFilter').daterangepicker({
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
	$('#modal1').modal("show")
  getAlarmsNotifications('#IDAlertHistoryBody',start.format('YYYY-MM-DD'),end.format('YYYY-MM-DD'),"*",true, customerName)
})

$('#modal1').modal("show")
getAlarmsNotifications('#IDAlertHistoryBody',timeStartHistory,timeEndHistory,"*",true, customerName)

// Riordina l'ordine della colonna al click
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
	let table = $("#IDAlertHistoryBody")

	insertionSort(table[0], column, direction)

	direction = !direction
})


// Funzione di ricerca nella tabella
$("#filter").on("keyup", function(){
  let value = $(this).val()
  $("#alert_container li").filter(function(){
    $(this).toggle($(this).text().indexOf(value) > -1)
  })
})

// *******************************************
// ************** FUNZIONI *******************
// *******************************************

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

// Funzione per recuperare i dati da tw per mettere nella tabella

function getAlarmsNotifications(idTable, startDate, endDate, filter, getHistory, customerName){
	tw.getListAlert(startDate, endDate, filter, getHistory,customerName)
	.then((list)=>{
		//$(idTable).empty()
		list.rows.forEach((el,i) =>{
			let timeStart = new Date(el.TimeStart).toLocaleString();
			let timeEnd = new Date(el.TimeEnd).toLocaleString();

			let color = 'rgba(255,255,255,0)'
			let icon 
			let filter_type ="All"

			
			if(el.Type== 'WRN'){
				color = "#fb8c0066"
				icon = 'warning'
				filter_type = 'Warning'
			}
			else if(el.Type == "ALM"){
				color = "#e5393566"
				icon = 'notifications'
				filter_type = 'Alarm'
			}
			else if(el.Type =="MSG"){
				color = '#fdd83566'
				icon  = 'mail'
				filter_type = 'Message'
			}

			/****Lista generata */
			let lista = '<li class="alert_list list-group-item mb-2 filter ' + filter_type +'"'
			lista +='style="background: ' + color + '">'
			lista +='<div class="card"> '
			lista +='<div class="alert_body card-body ">'
			lista +='<div class="align-items-center d-flex me-5">'
			lista += '<span class="material-icons-outlined">'+icon+'</span>'
			lista +='</div> '
			lista +='<div class="row row-cols-2 row-cols-lg-4 w-100">'
			lista +='<div class="mb-2"> '+ el.CustomerName +'</div>'
			lista +='<div class="mb-2"> '+ el.MachineName +'</div>'
			lista +='<div class="mb-2">'+ timeStart +'</div>'
			lista +='<div class="mb-2">'+ timeEnd +'</div>'
			//lista +='<div> '+ el.Gravity+'</div>'
			lista +='<div class="col-12 mt-2"> '+ el.Message+'</div>'
			lista +='</div>'
			lista +='</div>'
			lista +='</div>'
			lista +='</li> '
			$('#alert_container').append(lista);

			/**** Funzione per il filtro Rapido della lista attraverso la premuta dei bottone */

			$(document).ready(function(){
				$('.filter-btn').click(function(){

					$(".filter-btn").removeClass('active');
					$(this).addClass('active');
					let btn_value = $(this).attr('data-filter')
					console.log(btn_value)
					if(btn_value == "All")
						{
							$(filter_type).show('1000');
						}
					else{
						$(".filter").not('.'+btn_value).hide('3000');
						$('.filter').filter('.'+btn_value).show('3000');
						
					}
					elseif(btn_value =="Warning")
					{
						$(filter_type).show('1000');
					}
					elseif(btn_value =="Message")
					{
						$(filter_type).show('1000');
					}
					elseif(btn_value =="Alarm")
					{
						$(filter_type).show('1000');
					}
				})
			})
	})
		$('#modal1').modal("hide")
	})
	.catch((err)=>{
		console.log('promise rejected', err)
	})
}
