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


let customerName = localStorage.getItem('global_customer')

// Cancella tutte le righe della tabella
$("#IDAlertActualBody").empty()

// Sorting function
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
	let table = $("#IDAlertActualBody")

	insertionSort(table[0], column, direction)

	direction = !direction
})


$('#modal1').modal("show")
// richiamo della funzione
getAlarmsNotifications("*", false,customerName);

// Funzione di ricerca nella tabella
$("#filter").on("keyup", function(){
  let value = $(this).val()
  $("#IDAlertActualBody tr").filter(function(){
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

// Funzione per il riordino delle colonne
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
function getAlarmsNotifications(filter, getHistory,customerName){
	tw.getListAlert("","",filter, getHistory,customerName)
	.then((list)=>{
		$("#IDAlertActualBody").empty()
		if(list.rows.length == 0){
			let row = '<tr class="alert" role="alert">'
			row    += '    <td ></td>'
			row    += '    <td ></td>'
			row    += '    <td ></td>'
			row    += '    <td ></td>'
			row    += '    <td >Nessun allarme trovato</td>'
			row    += '</tr>'
			// Aggiunge la riga alla tabella
			$('#IDAlertActualBody').append(row);
		}

		list.rows.forEach(el =>{
			let timeStart = new Date(el.TimeStart).toLocaleString();
			let row = '<tr class="alert" role="alert">'
			row    += '    <td >' + timeStart  + '</td>'
			row    += '    <td >' + el.MachineName    + '</td>'
			row    += '    <td >' + el.Gravity + '</td>'
			row    += '    <td >' + el.CustomerName  + '</td>'
			row    += '    <td >' + el.Message  + '</td>'
			row    += '</tr>'
			// Aggiunge la riga alla tabella
			$('#IDAlertActualBody').append(row);
		})
		$('#modal1').modal("hide")
	})
	.catch((err)=>{
		console.log('promise rejected', err)
	})
}
