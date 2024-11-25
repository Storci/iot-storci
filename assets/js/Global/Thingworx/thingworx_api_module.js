//import * as am from "../amchart/amchart_functions.js"

let baseUrl   		 = 'https://storciiot.storci.com:8445/Thingworx/'
let appKey 				 = 'cdd83674-f63f-4535-9aa2-33ac5b70b52c'

/* I SERVIZI DI SEGUITO APPARTENGONO ALLA THING 'Storci.Thing.Manage.Bootstrap' */

// *** Impostazioni generiche ***
// Imposta il percorso della things di bootstrap
let bootstrapThing = 'Things/Storci.Thing.Manage.Bootstrap/Services/'
// fetch method Imposta gli header da utilizzare nelle Fetch API
let headers = {
    "appKey": appKey,
    "Accept": "application/json",
    "Content-Type": "application/json"
};

/**
 * It takes an entity name as input, calls the REST API, and returns a promise that resolves to the
 * response
 * recupera i dati generali di tutte le celle installate dal cliente.
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @returns A promise.
 */
function service_01_getDryersGeneralInfo(entityName) {
    let url = baseUrl + bootstrapThing + 'service_01_getDryersGeneralInfo';
    let data = JSON.stringify({ "entityName": entityName });
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}
/**
 * It takes an entity name as input, calls the REST API, and returns a promise that resolves to the
 * response
 * recupera i dati generali di tutte le celle installate dal cliente.
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @returns A promise.
 */
function service_02_getLinesGeneralInfo(entityName) {
    let url = baseUrl + bootstrapThing + 'service_02_getLinesGeneralInfo';
    let data = JSON.stringify({ "entityName": entityName });
    /***utilizzo del API fetch */
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

/**
 * It takes three parameters, it calls a REST API, and it returns a promise
 * recupera la lista di produzione di una cella.
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @param startTime - "2019-01-01T00:00:00.000Z"
 * @param endTime - "2019-11-01T00:00:00.000Z"
 * @returns A promise.
 */
function service_03_getDryerHistoryProductions(entityName, startTime, endTime) {
    let url = baseUrl + bootstrapThing + 'service_03_getDryerHistoryProductions_V2';
    let data = JSON.stringify({ "entityName": entityName ,"startTime":startTime, "endTime":endTime});
    /**fetch api */
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

/**
 * It takes three parameters, it calls a REST API, and it returns a promise
 * recupera la lista di produzione di una linea.
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @param startTime - "2019-01-01T00:00:00.000Z"
 * @param endTime - "2019-11-01T00:00:00.000Z"
 * @returns A promise.
 */
function service_04_getLineHistoryProductions(entityName, startTime, endTime) {
    let url = baseUrl + bootstrapThing + 'service_04_getLineHistoryProductions';
    let data = JSON.stringify({ "entityName": entityName, "startTime":startTime, "endTime":endTime});
    /**fectch API */
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
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
function service_05_getDryerStartEnd(entityName, startTime, endTime) {
    let url = baseUrl + bootstrapThing + 'service_05_getDryerStartEnd';
    let data = JSON.stringify({ "entityName": entityName, "startTime":startTime, "endTime":endTime});
    // fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
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
function service_10_getAlerts(startDate, endDate, filter,getHistory,customerName) {
    let url = baseUrl + bootstrapThing + 'service_10_getAlerts';
    let data = JSON.stringify({"startDate":startDate, "endDate":endDate, "filter":filter, "getHistory":getHistory, "customerName":customerName});
    //fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}
/**
 * It takes a query as input, calls the REST API, and returns the response
 * Recupera gli allarmi attivi della linea
 * @param query - The query to send to the REST API.
 * @returns A promise.
 */
function service_11_AlertsReport(query) {
    let url = baseUrl + bootstrapThing + 'service_11_AlertsReport';
    let data = JSON.stringify({"query":query});
    // fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
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
function service_80_githubAPI(urlGit) {
    let url = baseUrl + bootstrapThing + 'service_80_githubAPI';
    let data = JSON.stringify({"url":urlGit});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

/**
 * It takes an entity name as input, calls a REST API, and returns the response
 * @param entityName - l'entityName da passare deve corrispondere alla thing customer (es. Storci.Thing.Canossa).
 * @returns A promise.
 */
function service_90_sidebar(entityName) {
    let url = baseUrl + bootstrapThing + 'service_90_sidebar';
    let data = JSON.stringify({"entityName":entityName});
    // fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}
/**
 * It takes two parameters, username and customerCode, and returns a promise that resolves to the
 * response from the REST API.
 * @param username - The username of the user you want to add
 * @param customerCode - This is the customer code that you want to add the user to.
 * @returns A promise.
 */
function service_97_addNewUser(username,customerCode) {
    let url = baseUrl + bootstrapThing + 'service_97_addNewUser';
    let data = JSON.stringify({"username":username,"customerCode":customerCode});
    // fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}
/**
 * It takes a username and a firebase token, and sends it to the server
 * Associa il token di firebase all'username su tw.
 * @param username - the username of the user
 * @param token - the token that you get from the Firebase API
 * @returns A promise.
 */
function service_98_setFirebaseToken(username,token,deviceId) {
    let url = baseUrl + bootstrapThing + 'service_98_setFirebaseToken';
    let data = JSON.stringify({username:username, firebaseToken:token, deviceId:deviceId});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

/**
 * It takes two parameters, username and notificationPermission, and returns a promise that resolves to
 * the response from the REST API
 * @param username - the username of the user
 * @param notificationPermission - true/false
 * @returns A promise.
 */
// Fetch API
function service_99_setNotificationPermission(username,notificationPermission) {
    let url = baseUrl + bootstrapThing + 'notificationPermission';
    let data = JSON.stringify({"username":username,"notificationPermission":notificationPermission});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}
/**
 * It takes a username as an argument, and returns a promise that resolves to the response from the
 * REST API.
 * @param username - The username of the user you want to get the information of.
 * @returns A promise.
 */
function service_100_getUser(username) {
    let url = baseUrl + bootstrapThing + 'service_100_getUser';
    let data = JSON.stringify({"username":username,});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}
// Recupera il valore di una property di una thing
function getPropertyName(entityName, propertyName) {
    let url =baseUrl + "Things/" + entityName + "/Properties/" + propertyName;
    let data = JSON.stringify({"username":username,});
    //Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}


/* THING : Storci.Thing.Manage.Bootstrap */
// Recupera l'elenco dei clienti presenti
function getCustomersList() {
    let url =  baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomersList";
	// Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
      //  body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Esegue una query verso influx e ritorna il risultato
function influxQuery(query) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/influxQuery";
    let data = JSON.stringify({"query":query,});
    //Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Recupera l'elenco dei gruppi macchina di un cliente
function getCustomerGroupMachine(customer,typeGroup) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomerGroupMachine";
    let data = JSON.stringify({"Customer":customer, "TypeGroup":typeGroup});
    //Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}



// Recupera l'elenco delle celle di un cliente
function getCustomerCells(customer) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomerCells";
    let data = JSON.stringify({"Customer":customer});
    //fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Recupera l'elenco delle celle di un cliente
function getCustomerCells_V2(customer) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomerCells_V2";
    let data = JSON.stringify({"Customer":customer});
    //fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}


// Recupera il record dell'utente inserito nella DataTable Storci.DataTables.Customer_Users.
function getUser(username) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getUser";
    let data = JSON.stringify({"username":username});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Recupera i dati della cella
function getCellInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCellInfo";
    let data = JSON.stringify({"entityName":entityName});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}


// Recupera i dati storici della cella
function getCellHistoryProductions(entityName, timeStart, timeEnd, filter) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCellHistoryProductions";
    let data = JSON.stringify({"entityName":entityName, "timeStart":timeStart, "timeEnd":timeEnd, "filter":filter});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Recupera la ricetta storica della cella
function getCellHistoryRecipe(entityName, timeStart, timeEnd) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCellHistoryRecipe";
    let data = JSON.stringify({"entityName":entityName, "timeStart":timeStart, "timeEnd":timeEnd});
    //Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}


// Recupera i dati dell'impasto della linea
function getLineDoughInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineDoughInfo";
    let data = JSON.stringify({"entityName":entityName});
    //Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}


// Recupera le informazioni sullo stato delle macchine del cliente
function getCustomersInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomersInfo";
    let data = JSON.stringify({"entityName":entityName});
    //fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}


//Recupera le informazione sulle machine del cliente
function getCustomerLineMachine(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getCustomerLineMachine";
    let data = JSON.stringify({"entityName":entityName});
    // fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Recupera le informazione sulla Pressa
function getLinePressInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLinePressInfo";
    let data = JSON.stringify({"entityName":entityName});
    //Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Recupera informazione sulla PastaInstant
function getLinePastaInstantInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLinePastaInstantInfo";
    let data = JSON.stringify({"entityName":entityName});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Recupera informazione sul Avanzamento Telaio
function getLineAvanzamentoTelaiInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineAvanzamentoTelaiInfo";
    let data = JSON.stringify({"entityName":entityName});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Recupera informazione sul Omnidryer
function getLineOmnidryerInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineOmnidryerInfo";
    let data = JSON.stringify({"entityName":entityName});
    // Fetch API
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Fetch API
// Recupera informazione sul Stenditrice
function getLineStenditriceInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineStenditriceInfo";
    let data = JSON.stringify({"entityName":entityName});
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Fetch API
// Recupera informazione del trabatoo
function getLineTrabattoInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineTrabattoInfo";
    let data = JSON.stringify({"entityName":entityName});
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Fetch API
//Questa funzione recupera  informazione generica della linea
function getLineInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineInfo";
    let data = JSON.stringify({"entityName":entityName});
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Fetch API
// la Funzione recupera informazione sulla macchina NidiLasagni
function getLineNidiLasagnaInfo(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineNidiLasagnaInfo";
    let data = JSON.stringify({"entityName":entityName});
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}


// Fetch API
// Recupera la produzione storica dell'impasto
function getLineDoughHistoryProduction(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineDoughHistoryProduction";
    let data = JSON.stringify({"entityName":entityName});
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

// Fetch API
// Recupera il conusmo  storica dell'impasto,sfarinato, liquidi, acqua ed ecc
function calculateConsumo(entityName, startDate, endDate) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/calculateConsumo";
    let data = JSON.stringify({"entityName":entityName, "startDate":startDate, "endDate":endDate});
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}
// Fetch API
// Recupera il conusmo  storica dell'impasto,sfarinato, liquidi, acqua ed ecc
function calculateConsumoImpasto(entityName, startDate, endDate) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/calculateConsumoImpasto";
    let data = JSON.stringify({"entityName":entityName, "startDate":startDate, "endDate":endDate});
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
}

//Fectch API
// Recupera gli allarmi attivi della linea
function getLineAlertsActive(entityName) {
    let url = baseUrl + "Things/Storci.Thing.Manage.Bootstrap/Services/getLineAlertsActive";
    let data = JSON.stringify({"entityName":entityName});
    
    return fetch(url, {
        method: 'POST',
        headers: headers,
        body: data
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    });
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
	service_99_setNotificationPermission,
	service_100_getUser,
	getPropertyName,
	getCustomersList,
	influxQuery,
	getCustomerGroupMachine,
	getCustomerCells,
    getCustomerCells_V2,
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
	getLineNidiLasagnaInfo,
	getLineInfo,
	getLineDoughHistoryProduction,
	getLineAlertsActive,
	getDryerTimeRange,
	getLineTimeRange,
    calculateConsumo,
    calculateConsumoImpasto
}
