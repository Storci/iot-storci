//import * as am from "../amchart/amchart_functions.js"

let baseUrl   		 = 'https://storciiot.storci.com:8445/Thingworx/'
let appKey 				 = 'cdd83674-f63f-4535-9aa2-33ac5b70b52c'

/* I SERVIZI DI SEGUITO APPARTENGONO ALLA THING 'Storci.Thing.Manage.Bootstrap' */

// *** Impostazioni generiche ***
// Imposta il percorso della things di bootstrap
let bootstrapThing = 'Things/Storci.Thing.Manage.Bootstrap/Services/'
// Imposta i settings da utilizzare nelle REST API.
let settings = {
	"url"     : '',
	"method"  : "POST",
	"timeout" : 0,
	"headers" : {
		"appKey"	  : appKey,
		"Accept"	  : "application/json",
		"Content-Type": "application/json"
	},
	"data": ''
};


/**
 * It takes an entity name as input, calls the REST API, and returns a promise that resolves to the
 * response
 * recupera i dati generali di tutte le celle installate dal cliente.
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @returns A promise.
 */
function service_01_getDryersGeneralInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_01_getDryersGeneralInfo'
	settings.data = JSON.stringify({"entityName":entityName})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes an entity name as input, calls a REST API, and returns a promise
 * recupera i dati generali di tutte le celle installate dal cliente.
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa)
 * @returns A promise.
 */
function service_02_getLinesGeneralInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_02_getLinesGeneralInfo'
	settings.data = JSON.stringify({"entityName":entityName})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes three parameters, it calls a REST API, and it returns a promise
 * recupera la lista di produzione di una cella.
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @param startTime - "2019-01-01T00:00:00.000Z"
 * @param endTime - "2019-11-01T00:00:00.000Z"
 * @returns A promise.
 */
function service_03_getDryerHistoryProductions(entityName, startTime, endTime){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_03_getDryerHistoryProductions'
	settings.data = JSON.stringify({"entityName":entityName, "startTime":startTime, "endTime":endTime})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes three parameters, it calls a REST API, and it returns a promise
 * recupera la lista di produzione di una linea.
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @param startTime - "2019-01-01T00:00:00.000Z"
 * @param endTime - "2019-11-01T00:00:00.000Z"
 * @returns A promise.
 */
function service_04_getLineHistoryProductions(entityName, startTime, endTime){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_04_getLineHistoryProductions'
	settings.data = JSON.stringify({"entityName":entityName, "startTime":startTime, "endTime":endTime})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes in a start date, end date, filter, getHistory, and customerName, and returns a promise that
 * resolves to a response from the REST API.
 * recupera i timestamp di inizio e fine essiccazione.
 * @param startDate - the start date of the data you want to retrieve
 * @param endDate - "2019-01-01T00:00:00.000Z"
 * @param filter - 
 * @param getHistory - true/false
 * @param customerName - The name of the customer
 * @returns A promise.
 */
function service_05_getDryerStartEnd(entityName, startTime, endTime){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_05_getDryerStartEnd'
	settings.data = JSON.stringify({"entityName":entityName, "startTime":startTime, "endTime":endTime})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes in a start date, end date, filter, getHistory, and customerName, and returns a promise that
 * resolves to the response from the REST API.
 * Recupera gli allarmi attivi della linea
 * @param startDate - The start date of the time period you want to get alerts for.
 * @param endDate - "2019-01-01T00:00:00.000Z"
 * @param filter - "all"
 * @param getHistory - true/false
 * @param customerName - The name of the customer you want to get alerts for.
 * @returns A promise.
 */
function service_10_getAlerts(startDate, endDate, filter,getHistory,customerName){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_10_getAlerts'
	settings.data = JSON.stringify({"startDate":startDate, "endDate":endDate, "filter":filter, "getHistory":getHistory, "customerName":customerName})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes a query as input, calls the REST API, and returns the response
 * Recupera gli allarmi attivi della linea
 * @param query - The query to send to the REST API.
 * @returns A promise.
 */
function service_11_AlertsReport(query){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_11_AlertsReport'
	settings.data = JSON.stringify({"query":query})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes a URL as an argument, and returns a promise that resolves to the response from the GitHub
 * API.
 * Il servizio effettua le chiamate rest api verso github.
 * Si è preferito utilizzare thingworx come intermediario perchè github revoca il personal access token
 * se lo trova nel codice nel repository. Quindi è impossibile usare un qualsiasi codice dentro a questa applicazione.
 * @param url - The URL of the GitHub API to call.
 * @returns A promise.
 */
function service_80_githubAPI(url){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_80_githubAPI'
	settings.data = JSON.stringify({"url":url})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes an entity name as input, calls a REST API, and returns the response
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @returns A promise.
 */
function service_90_sidebar(entityName){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_90_sidebar'
	settings.data = JSON.stringify({"entityName":entityName})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes two parameters, username and customerCode, and returns a promise that resolves to the
 * response from the REST API.
 * @param username - The username of the user you want to add
 * @param customerCode - This is the customer code that you want to add the user to.
 * @returns A promise.
 */
function service_97_addNewUser(username, customerCode){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_97_addNewUser'
	settings.data = JSON.stringify({username:username, customerCode:customerCode})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}

/**
 * It takes a username and a firebase token, and sends it to the server
 * Associa il token di firebase all'username su tw.
 * @param username - the username of the user
 * @param token - the token that you get from the Firebase API
 * @returns A promise.
 */
function service_98_setFirebaseToken(username, token, deviceId){
	// Definisce l'url da richiamare per la REST API
	settings.url  = baseUrl + bootstrapThing + 'service_98_setFirebaseToken'
	settings.data = JSON.stringify({username:username, firebaseToken:token, deviceId:deviceId})
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){ $.ajax(settings).done(response => resolve(response)) })
}





// ** FUNZIONI DA SISTEMARE COME SOPRA, SIA SU TW CHE QUI**



// Recupera il valore di una property di una thing
function getPropertyName(entityName, propertyName){
	// Definisce l'url da richiamare per la REST API
	var url = baseUrl + "Things/" + entityName + "/Properties/" + propertyName;

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "GET",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": ""
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}


/* THING : Storci.Thing.Manage.Bootstrap */
// Recupera l'elenco dei clienti presenti
function getCustomersList(){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomersList";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": ""
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Esegue una query verso influx e ritorna il risultato
function influxQuery(query){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/influxQuery";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"query" : query})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Recupera l'elenco dei gruppi macchina di un cliente
function getCustomerGroupMachine(customer, typeGroup){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomerGroupMachine";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"Customer":customer, "TypeGroup":typeGroup})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Recupera l'elenco delle celle di un cliente
function getCustomerCells(customer){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomerCells";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"Customer":customer})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Recupera il record dell'utente inserito nella DataTable Storci.DataTables.Customer_Users.
function getUser(username){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getUser";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"username":username})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Recupera i dati della cella
function getCellInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCellInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Recupera i dati storici della cella
function getCellHistoryProductions(entityName, timeStart, timeEnd, filter){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCellHistoryProductions";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName, "timeStart":timeStart, "timeEnd":timeEnd, "filter":filter})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Recupera la ricetta storica della cella
function getCellHistoryRecipe(entityName, timeStart, timeEnd){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCellHistoryRecipe";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName, "timeStart":timeStart, "timeEnd":timeEnd})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Recupera i dati dell'impasto della linea
function getLineDoughInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineDoughInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => {resolve(response)});
	});
}
// Recupera le informazioni sullo stato delle macchine del cliente
function getCustomersInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomersInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// Recupera le informazione sulle machine del cliente
function  getCustomerLineMachine(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomerLineMachine";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
//Recupera le informazione sulla Pressa
function  getLinePressInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLinePressInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// Recupera informazione sulla PastaInstant
function  getLinePastaInstantInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLinePastaInstantInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// Recupera informazione sul Avanzamento Telaio
function  getLineAvanzamentoTelaiInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineAvanzamentoTelaiInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// Recupera informazione sul Omnidryer
function  getLineOmnidryerInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineOmnidryerInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// Recupera informazione sul Stenditrice
function  getLineStenditriceInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineStenditriceInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// Recupera informazione sul Trabatto
function  getLineTrabattoInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineTrabattoInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// Recupera le informazioni della linea
function getLineInfo(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineInfo";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// La funzione restituisce la lista dello storico produzioni dell'impasto
function getLineDoughHistoryProduction(filter, entityName, startTime, endTime){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineDoughHistoryProduction";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({'filter':filter, 'entityName':entityName, 'startTime':startTime, 'endTime':endTime})
	};

	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}
// Recupera gli allarmi attivi della linea
function getLineAlertsActive(entityName){
	// Definisce l'url da richiamare per la REST API
	let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineAlertsActive";

	// Imposta i settings da utilizzare nelle REST API.
	// Nel campo data vengono inseriti i parametri di ingresso del servizio di TW.
	let settings = {
		"url"     : url,
		"method"  : "POST",
		"timeout" : 0,
		"headers" : {
			"appKey"	  : appKey,
			"Accept"	  : "application/json",
			"Content-Type": "application/json"
		},
		"data": JSON.stringify({"entityName":entityName})
	};
	// Ritorna una promise, in questo modo il valore ritorna solamente quando la REST API è conclusa.
	return new Promise(function(resolve){
		// Esegue la chiamata REST API.
		$.ajax(settings).done(response => resolve(response));
	})
}

// COMMON FUNCTIONS

// Viene effettuata una query verso thingworx per recuperare
// il timestamp di inizio produzione. In questo modo i grafici
// vengono eliminati gli spazi vuoti del grafico presenti prima di ogni produzione
// Se viene generato un'errore sul recupero del timestamp di inizio produzione,
// il grafico partirà dalla mezzanotte del giorno attuale.
async function getDryerTimeRange(entityName){
	// Definisce le variabili come date
	let timeStart = new Date()
	let timeEnd   = new Date()
	// Imposta l'ora a mezzanotte del giorno attuale
	timeStart.setHours(0,0,0,0)
	// Recupera il timestamp dell'inizio di Produzione
	// Se non viene trovato rimane impostato il time a mezzanotte
	try{
		// Definisce la query da inviare a influxdb
		let query  = 'SELECT '
		query += '"Dati_Ciclo_Ciclo_On" '
		query += 'FROM "' + entityName + '" '
		query += 'WHERE time > ' + timeStart.getTime() + 'ms and time < ' + timeEnd.getTime() + 'ms '
		query += 'AND "Dati_Ciclo_Ciclo_On" =  true ORDER BY time DESC LIMIT 1'
		// Effettua la query a influxdb
		let response = await influxQuery(query)
		// Imposta il timestamp di inizio con il time recuperato da influxdb.
		// Ogni values di influx è jsonArray contenente il timestamp e tutte le colonne richieste dalla query
		// L'elemento 0 dell'array (el[0]) è il timestamp, sopra lo zero sono dati
		response.results[0].series[0].values.forEach(el => { timeStart = new Date(el[0]) })
		// Converte la variabile in timestamp e decrementa lo zoom di un'ora
		timeStart = Number(timeStart.getTime()) - 3600000
	}catch(e){
		// Converte la variabile in timestamp
		timeStart = Number(timeStart.getTime())
	}
	// Converte la variabile in timestamp ed incrementa lo zoom di un'ora
	timeEnd = Number(timeEnd.getTime()) + 3600000
  // Ritorna un json object con la data di inizio e fine
	return {'start':timeStart, 'end':timeEnd}
}


// Viene effettuata una query verso thingworx per recuperare
// il timestamp di inizio produzione. In questo modo i grafici
// vengono eliminati gli spazi vuoti del grafico presenti prima di ogni produzione
// Se viene generato un'errore sul recupero del timestamp di inizio produzione,
// il grafico partirà dalla mezzanotte del giorno attuale.
async function getLineTimeRange(entityName){
	// Definisce le variabili come date
	let timeStart = new Date()
	let timeEnd   = new Date()
	// Imposta l'ora a mezzanotte del giorno attuale
	timeStart.setHours(0,0,0,0)
	// Recupera il timestamp dell'inizio di Produzione
	// Se non viene trovato rimane impostato il time a mezzanotte
	try{
		// Definisce la query da inviare a influxdb
		let query  = 'SELECT '
		query += '"Impasto_Ricetta_Produzione_In_Corso" '
		query += 'FROM "' + entityName + '" '
		query += 'WHERE time > ' + timeStart.getTime() + 'ms and time < ' + timeEnd.getTime() + 'ms '
		query += 'AND "Impasto_Ricetta_Produzione_In_Corso" =  true LIMIT 1'
		// Effettua la query a influxdb
		let response = await influxQuery(query)
		// Imposta il timestamp di inizio con il time recuperato da influxdb.
		// Ogni values di influx è jsonArray contenente il timestamp e tutte le colonne richieste dalla query
		// L'elemento 0 dell'array (el[0]) è il timestamp, sopra lo zero sono dati
		response.results[0].series[0].values.forEach(el => { timeStart = new Date(el[0]) })
		// Converte la variabile in timestamp e decrementa lo zoom di un'ora
		timeStart = Number(timeStart.getTime()) - 3600000
	}catch(e){
		console.error(e)
		// Converte la variabile in timestamp
		timeStart = Number(timeStart.getTime())
	}
	// Converte la variabile in timestamp ed incrementa lo zoom di un'ora
	timeEnd = Number(timeEnd.getTime()) + 3600000
  // Ritorna un json object con la data di inizio e fine
	return {'start':timeStart, 'end':timeEnd}
}


export{
	service_01_getDryersGeneralInfo,
	service_02_getLinesGeneralInfo,
	service_03_getDryerHistoryProductions,
	service_04_getLineHistoryProductions,
	service_05_getDryerStartEnd,
	service_10_getAlerts,
	service_11_AlertsReport,
	service_80_githubAPI,
	service_90_sidebar,
	service_97_addNewUser,
	service_98_setFirebaseToken,
	getPropertyName,
	getCustomersList,
	influxQuery,
	getCustomerGroupMachine,
	getCustomerCells,
	getUser,
	getCellInfo,
	getCellHistoryProductions,
	getCellHistoryRecipe,
	getLineDoughInfo,
	getCustomersInfo,
	getCustomerLineMachine,
	getLinePressInfo,
	getLinePastaInstantInfo,
	getLineAvanzamentoTelaiInfo,
	getLineOmnidryerInfo,
	getLineStenditriceInfo,
	getLineTrabattoInfo,
	getLineInfo,
	getLineDoughHistoryProduction,
	getLineAlertsActive,
	getDryerTimeRange,
	getLineTimeRange
}
