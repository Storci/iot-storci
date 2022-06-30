// Funzione che recupera la lingua scelta dall'utente
// e sostituisce tutti i testi della pagina
function getLanguage(){
  // Recupera il valore di language salvato dal client
  let select_language = localStorage.getItem("select_language")
  let select_language_complete = localStorage.getItem("select_language_complete")
  $('.language_menu > a').text(select_language_complete)
  // Seleziona tutti gli elementi con l'attributo [translate_id]
  // Effettua, poi, un ciclo per ogni elemento trovato
  $('[translate_id]').each(function(index, element) {
    // Sostituisce il testo dell'elemento utilizzando l'array_translate_id per recuperare
    // la traduzione corretta.
    // Il valore dell'attributo [translate_id] è la stessa chiave del json
    try{
      $(this).text(array_translate_id[$(this).attr("translate_id")][select_language]);
    }catch(e){}
  });
};

// La funzione viene eseguita al cambio di lingua
$(".translate").click(function() {
  // Recupera l'id della lingua selezionata.
  // l'id ha il codice della lingua (es. eng, it, es, fr).
  let select_language = $(this).attr('id')
  $('.language_menu > a').text($(this).attr('value'))
  // Salva la selezione nella variabile localStorage.
  // la local storage rimane salvata sul client.
  localStorage.setItem('select_language', $(this).attr('id'));
  localStorage.setItem('select_language_complete', $(this).attr('value'));
  // Seleziona tutti gli elementi con l'attributo [translate_id]
  // Effettua, poi, un ciclo per ogni elemento trovato
  $('[translate_id]').each(function(index, element) {
    // Sostituisce il testo dell'elemento utilizzando l'array_translate_id per recuperare
    // la traduzione corretta.
    // Il valore dell'attributo [translate_id] è la stessa chiave del json
    try{
      $(this).text(array_translate_id[$(this).attr("translate_id")][select_language]);
    }catch(e){}
  });
});


const array_translate_id = {
  // GENERIC ID - usati in più pagine
  'dryers'               : { 'eng':'Dryers',               'it':'Celle'                },
  'recipe'               : { 'eng':'Recipe',               'it':'Ricetta'              },
  'dryer'                : { 'eng':'Dryer',                'it':'Cella'                },
  'recipe_in_use'        : { 'eng':'Recipe in Use',        'it':'Ricetta in Uso'       },
  'list_production'      : { 'eng':'List Productions',     'it':'Lista Produzioni'     },
  'recipe_name'          : { 'eng':'Recipe Name',          'it':'Nome Ricetta'         },
  'duration'             : { 'eng':'Duration',             'it':'Durata'               },
  'start_production'     : { 'eng':'Start Production',     'it':'Inizio Produzione'    },
  'end_production'       : { 'eng':'End Production',       'it':'Fine Produzione'      },
  'line_details'         : { 'eng':'Line Details',         'it':'Dettagli Linea'       },
  'extruder_pressure'    : { 'eng':'Extruder Pressure',    'it':'Pressione_Estrusore'  },
  'cylinder_temperature' : { 'eng':'Cylinder Temperature', 'it':'Temperatura Cilindro' },
  'head_temperature'     : { 'eng':'Head Temperature',     'it':'Temperatura Testata'  },
  'trend_line'           : { 'eng':'Trend Line',           'it':'Grafico Linea'        },
  'history_line'         : { 'eng':'History Line',         'it':'Storico Linea'        },

  // Pagina Info
  'dryers_group'                     : { 'eng':'Dryers Group',                     'it':'Gruppo Celle'                     },
  'dryers_in_processing'             : { 'eng':'Dryers in Processing',             'it':'Celle in Essicazione'             },
  'work_time'                        : { 'eng':'Work Time',                        'it':'Tempo di Lavoro'                  },
  'consumption'                      : { 'eng':'Consumption',                      'it':'Consumi'                          },
  'pasta_line'                       : { 'eng':'Pasta Line',                       'it':'Linea Pasta'                      },
  'hourly_production'                : { 'eng':'Hourly Production',                'it':'Produzione Oraria'                },
  'expected_production'              : { 'eng':'Expected Production',              'it':'Produzione Prevista'              },
  'completed_production'             : { 'eng':'Completed Production',             'it':'Produzione Completata'            },
  'estimated_time_of_end_production' : { 'eng':'Estimated Time of End Production', 'it':'Tempo stimato di fine produzione' },

  // Pagina DryersInfo
  'days'                      : { 'eng':'days',                      'it':'giorni'                  },
  'producted_line'            : { 'eng':'Producted Line',            'it':'Produzione Linea'        },
  'dryers_energy_consumption' : { 'eng':'Dryers Energy Consumption', 'it':'Energia Consumata Celle' },

  // Pagina DryersInfo
  'recipe_time' : { 'eng':'Recipe Time', 'it':'Tempo Ricetta'  },
  'worked_time' : { 'eng':'Worked Time', 'it':'Tempo lavorato' },
  'trolleys'    : { 'eng':'Trolleys',    'it':'Carrelli'       },

  // Pagina DryersDetails
  'dryer_details'               : { 'eng':'Dryer Details',               'it':'Dettaglio Cella'            },
  'dryer_number'                : { 'eng':'Dryer Number',                'it':'Numero Cella'               },
  'number_of_trolley'           : { 'eng':'Number of Trolley',           'it':'Numero di Carrelli'         },
  'dryer_status'                : { 'eng':'Dryer Status',                'it':'Stato Cella'                },
  'total_drying_time'           : { 'eng':'Total Drying Time',           'it':'Tempo Totale Essiccazione'  },
  'current_phase_time'          : { 'eng':'Current Phase Time',          'it':'Tempo Fase Attuale'         },
  'dryers_info'                 : { 'eng':'DRYER INFO',                  'it':'DATI CELLA'                 },
  'dryer_graph'                 : { 'eng':'DRYER GRAPH',                 'it':'GRAFICO CELLA'              },
  'drying_graphic'              : { 'eng':'Drying graphic',              'it':'Grafico Essiccazione'       },
  'dryer_history_graph'         : { 'eng':'DRYER HISTORY GRAPH',         'it':'GRAFICO STORICO CELLA'      },
  'start_drying'                : { 'eng':'BEGINNING OF DESICCATION',    'it':'Inizio Essiccazione'        },
  'end_drying'                  : { 'eng':'END OF  DESICCATION',          'it':'Fine Essiccazione'         },
  'drying_graph'                : { 'eng':'Drying Graph',                'it':'Grafico Essiccazione'       },
  'total_calories'              : { 'eng':'Total Calories Consumed',     'it':'Calorie Totali Consumate'   },
  'average_ambient_temperature' : { 'eng':'Average Ambient Temperature', 'it':'Temperatura Ambiente Media' },
  'average_ambient_umidity'     : { 'eng':'Average Ambient Umidity',     'it':'Umidità Ambiente Media'     },
  'phase'                       : { 'eng':'Phase',                       'it':'Fase'                       },
  'phase_time'                  : { 'eng':'Phase Time',                  'it':'Tempo Fase'                 },
  'delta_t'                     : { 'eng':'Delta T',                     'it':'Delta T'                    },
  'temperature_sp'              : { 'eng':'Temperature SP',              'it':'SP Temperatura'             },
  'umidity_sp'                  : { 'eng':'Umidity SP',                  'it':'SP Umidità'                 },
  'fans_speed'                  : { 'eng':'Fans Speed',                  'it':'Velocità Ventole'           },
  'fans_work_time'              : { 'eng':'Fans Work Time',              'it':'Tempo Lavoro Ventole'       },
  'fans_pause_time'             : { 'eng':'Fans Pause Time',             'it':'Tempo Pausa Ventole'        },
  'current_recipe'              : { 'eng':'Current Recipe',              'it':'Ricetta in uso'             },
  'actual_prodcution'           : { 'eng':'Actual Production',           'it':'Produzione Attuale'         },
  'recipe_name'                 : { 'eng':'Recipe Name',                 'it':'Nome Ricetta'               },
  'duration'                    : { 'eng':'Duration',                    'it':'Durata'                     },
  'dryer_history'               : { 'eng': 'Dryer History',              'it': 'Storico Cella'             },
  'actual_pressure'             : { 'eng': 'Actual Pressure',            'it': 'Pressione Attuale'         },
  'liquid_quantity'             : { 'eng': 'SP Liquid Quantity',         'it': 'SP Quantità Liquida'       },
  'quantity_of_flour'           : { 'eng': 'Amount of Flour',            'it': 'Quantità Sfarinati'        },
  'average_production'          : { 'eng':'Actual Average Production Last Hour', 'it': 'Produzione Media Effettiva Ultima Ora'},
  'SP_production'               : { 'eng': 'SP Production', 'it': 'SP Produzione'                          },
  'quantity_produced'           : { 'eng': 'Amount Produced', 'it':'Quantità Prodotta'                     },

  // Pagina LinesInfo
  'hourly_quantity_flours_set'  : { 'eng':'Hourly quantity Flours Set',  'it':'Portata Sfarinati Impostata' },
  'hourly_quantity_liquids_set' : { 'eng':'Hourly quantity Liquids Set', 'it':'Portata Liquidi Impostata'   },
  'producted_quantity'          : { 'eng':'Producted Quantity',          'it':'Quantità Prodotta'           },
  'actual_production'           : { 'eng':'Actual Production',           'it':'Produzione Attuale'          },
  'actual_extruder_pression'    : { 'eng':'Actual Extruder Pression',    'it':'Pressione Estrusore Attuale' },
  'daily_production'            : { 'eng':'Daily Production',            'it':'Produzione Giornaliera'      },
  'actual_production'           : { 'eng':'Actual Production',           'it':'Produzione Attuale'          },
  'actual_alarms'               : { 'eng':'Actual Alarms',               'it':'Allarmi Attuale'             },
  'machine_list'                : { 'eng':'Machine List',                'it':'Lista Macchine'              },
  'dough'                       : { 'eng':'Dough',                       'it':'Impasto'                     },
  'spreader'                    : { 'eng':'Spreader',                    'it':'Stenditrice'                 },
  'pasta-instant'               : { 'eng':'Pasta Instant',               'it':'Pasta Instant'               },
  'tray-feeder'                 : { 'eng':'Tray Feeder',                 'it':'Avanzamento Telai'           },
  'destacker-robot'             : { 'eng':'Destacker Robot',             'it':'Robot Deimpilatore'          },
  'omnidryer'                   : { 'eng':'Omnidryer',                   'it':'Omnidryer'                   },
  'extruder'                    : { 'eng':'Extruder',                    'it':'Pressa'                      },
  'tray-stacker'                : { 'eng':'Tray Stacker',                'it':'Impilatore'                  },
  'pre-dryer'                   : { 'eng':'Pre Dryer',                   'it':'Trabatto'                    },
  'omnidryer_history'           : { 'eng':'Omnidryer History',           'it':'Storico Omnidryer'           },

  // Pagina dough
  'dough_info'           : { 'eng':'Dough Info',              'it':'Dati Impasto'                    },
  'total_dough'          : { 'eng':'Total Dough',             'it':'Impasto Totale'                  },
  'flour_dousing_1'      : { 'eng':'Flour Dosing 1',          'it':'Dosaggio Sfarinato 1'            },
  'water_dosing'         : { 'eng':'Water Dosing',            'it':'Dosaggio Acqua'                  },
  'liquid_dosing_1'      : { 'eng':'Liquid Dosing 1',         'it':'Dosaggio Liquido 1'              },
  'water_temperature'    : { 'eng':'Water Temperature',       'it':'Temperatura Acqua'               },
  'tank_vacuum'          : { 'eng':'Tank Vacuum',             'it':'Vuoto Vasca'                     },
  'level_tank'           : { 'eng':'Level_Tank',              'it':'Livello Vasca'                   },
  'trend_dough'          : { 'eng':'Trend Dough',             'it':'Grafico Impasto'                 },
  'dough_data'           : { 'eng':'Instant Dough Data',      'it':'Dati Impasto Istantanei'         },
  'dough_set_point'      : { 'eng':'Dough Set Point',         'it':'Set Point Impasto'               },
  'liquid'               : { 'eng':'Liquid',                  'it':'Liquidi'                         },
  'Uovo'                 : { 'eng':'Egg or Liquid Dye',       'it':'Uovo (o Liquido Colorante)'      },
  'group_dashboard'      : { 'eng':'Dough Group Dashboard',   'it': 'Dashboard Gruppo Impasto'       },
  'history_group'        : { 'eng':'Dough Group History',     'it':'Storico Gruppo Impasto'          },
  'production_list'      : { 'eng':'List of Historical Productions', 'it':'Lista Produzioni Storiche'},
  'start_production'     : { 'eng':'Production Start',        'it':'Inizio Produzione'               },
  'end_production'       : { 'eng':'Production End',          'it':'Fine Produzione'                 },
  'history_chart'        : { 'eng':'History Chart',           'it':'Grafico Storico'                 },
  // Pagina Extruder
  'extruder_info'         : { 'eng':'Extruder Info',          'it':'Dettagli Pressa'},
  'trend_extruder'        : { 'eng':'Trend Extruder',         'it':'Grafico Pressa' },
  'flour'                 : { 'eng':'Flour',                  'it':'Sfarinati'      },
  'dough_details'         : { 'eng':'Dough Details',          'it':'Dettaglio Impasto'},
  'dashboard_extruder'    : { 'eng':'Dashboard Extruder',     'it':'Dashboard Estrusore' },
  'extruder_history'      : { 'eng':'Extruder History',       'it':'Storico Estrusore'},
  'dati_vite'             : { 'eng':'Instant Screw Data',     'it':'Dati vite Instantanei'},
  

  // Pagina Omnidryer
  'omnidryer_details'   : { 'eng':'Omnidryer Details',   'it':'Dati Omnidryer'      },
  'omnidryer_info'      : { 'eng':'Omnidryer Info',      'it':'Dati Omnidryer'      },
  'sticks_in_tunnel'    : { 'eng':'Omnidryer Info',      'it':'Dati Omnidryer'      },
  'sticks_produced'     : { 'eng':'Sticks Produced',     'it':'Canne Prodotte'      },
  'stage_1_temperature' : { 'eng':'Stage 1 Temperature', 'it':'Stage 1 Temperatura' },
  'stage_2_temperature' : { 'eng':'Stage 2 Temperature', 'it':'Stage 2 Temperatura' },
  'stage_3_temperature' : { 'eng':'Stage 3 Temperature', 'it':'Stage 3 Temperatura' },
  'stage_1_humidity'    : { 'eng':'Stage 1 Humidity',    'it':'Stage 1 Umidità'     },
  'stage_2_humidity'    : { 'eng':'Stage 2 Humidity',    'it':'Stage 2 Umidità'     },
  'stage_3_humidity'    : { 'eng':'Stage 3 Humidity',    'it':'Stage 3 Umidità'     },
  'trend_omnidryer'     : { 'eng':'Trend Omnidryer',     'it':'Grafico Omnidryer'   },

  // Pagina Pasta-instant
  'pasta_instant_details' : { 'eng':'Pasta Instant Details', 'it':'Dati Pasta Instant'    },
  'pasta_instant_info'    : { 'eng':'Pasta Instant Info',    'it':'Dati Pasta Instant'    },
  'cooking_time'          : { 'eng':'Cooking Time',          'it':'Tempo Cottura'         },
  'room_temperature'      : { 'eng':'Room Temperature',      'it':'Temperatura Camera'    },
  'steam_flow'            : { 'eng':'Steam Flow',            'it':'Flusso Vapore'         },
  'trend_pasta_instant'   : { 'eng':'Trend Pasta Instant',   'it':'Grafico Pasta Instant' },
  'pasta_instant'         : { 'eng': 'Pasta Instant',        'it':'Pasta Instant'         },
  'steam_flow'            : { 'eng': 'Steam Flow',           'it':'Fusso Vapore'          },

  // Pagina Pre-DRYER
  'pre_dryer_details'     : { 'eng':'Pre-Dryer Details', 'it':'Dati Trabatto'        },
  'pre_dryer_info'        : { 'eng':'Pre-Dryer Info',    'it':'Dati Trabatto'        },
  'pre_dryer_temperature' : { 'eng':'Pre-Dryer Info',    'it':'Temperatura Trabatto' },
  'trend_pre_dryer'       : { 'eng':'Trend Pre-Dryer',   'it':'Grafico Trabatto'     },
  'pre_dryer_history'     : { 'eng':'Pre-Dryer History', 'it':'Storico Predryer'     },

  // Pagina Spreader
  'spreader_details'  : { 'eng':'Spreader Details',  'it':'Dati Stenditrice'    },
  'spreader_info'     : { 'eng':'Spreader Info',     'it':'Dati Stenditrice'    },
  'stick_weight'      : { 'eng':'Stick Weight',      'it':'Peso Canna'          },
  'time_stick'        : { 'eng':'Time Stick',        'it':'Tempo Canna'         },
  'sticks_for_minute' : { 'eng':'Sticks For Minute', 'it':'Canne per Minuto'    },
  'produced_sticks'   : { 'eng':'Produced Sticks',   'it':'Canne Prodotte'      },
  'trend_spreader'    : { 'eng':'Trend Spreader',    'it':'Grafico Stenditrice' },
  'spreader_history'  : { 'eng':'Spreader History',  'it':'Storico Stenditrice' },

  // Pagina Trail feeder
  'tray_feeder_details' : { 'eng':'Tray-Feeder Details', 'it':'Dati Avanzamento Telai'    },
  'tray_feeder_info'    : { 'eng':'Tray-Feeder Info',    'it':'Dati Avanzamento Telai'    },
  'trays_for_minute'    : { 'eng':'Trays for Minute',    'it':'Telai per Minuto'          },
  'motor_speed'         : { 'eng':'Motor Speed',         'it':'Velocità Motore'           },
  'trend_tray_feeder'   : { 'eng':'Trend Tray-Feeder',   'it':'Grafico Avanzamento Telai' },
  'trend_tray_feeder'   : { 'eng':'Trend Tray-Feeder',   'it':'Grafico Avanzamento Telai' },
  'tray_feeder_history' : { 'eng':'Tray Feeder History', 'it':'Storico Avanzamento Telai' },
  // SideBar menu
  'machines'                  : {'eng':'Machines',       'it':'Macchine'                  },
  'alarms'                    : {'eng':'Alarms',         'it':'Allarmi'                   },
  'alarms_history'            : {'eng':'Alarm History',  'it':'Storico Alarmi'            },
  'profile_settings'          : {'eng':'Profile Settings','it':'Impostazione del Profilo' },
  'clients_list'              : {'eng' : 'List of Clients','it':'Lista CLienti'           },
  // Pagina Customer
  'list_clients_connected'    : {'eng': 'List of Clients Connected',    'it' : 'Lista Clienti Connessi'   },
  'list_clients_disconnected' : {'eng': 'List of Clients Disconnected', 'it': 'Lista Clienti Disconnessi' },
  'connection_status'         : {'eng' : 'Connection Status',           'it':'Stato Connessione'          },
  'dryers'                    : {'eng' : 'Dryers',                      'it':'Celle'                      },
  'line'                      : {'eng' : 'Line',                        'it':'Linea'                      },
  //pagine profilo
  'name'                      : {'eng':'Name',                                        'it':'Nome'                             },
  'lastname'                  : {'eng': 'Surname',                                    'it':'Cognome'                          },
  'email'                     : {'eng': 'Email',                                      'it':'indirizzo Mail'                   },
  'company'                   : {'eng': 'Company Name',                               'it':'Nome Azienda'                     },
  'tel'                       : {'eng': 'Phone Number',                               'it':'Numero Cellulare'                 },
  'state'                     : {'eng': 'State/Country',                              'it':'Stato / Paese'                    },
  'profile_settings'          : {'eng': 'Profile Settings',                           'it':'Impostazione Profilo'             },
  'update_btn'                : {'eng': 'Update profile Info',                        'it':'Aggiorna informazione profilo'    },
  'change_password'           : {'eng': 'Change Password',                            'it':'Cambio Password'                  },
  'old'                       : {'eng': 'Old Password',                               'it':'Vecchia Password'                 },
  'new'                       : {'eng': 'New Password ',                              'it':'Nuova Password'                   },
  'update_heading'            : {'eng': 'Update Password',                            'it':'Aggiorna Password'                },
  'update_btn'                : {'eng': 'Update Password',                            'it':'Aggiorna Password'                },
  'notification'              : {'eng': 'Allow Notification',                         'it':'Consentire Notifiche'             },
  'theme'                     : {'eng': 'Change Theme',                               'it':'Cambia Tema'                      },
  'no'                        : {'eng': 'No',                                         'it':'No'                               },
  'yes'                       : {'eng': 'Yes',                                        'it':'Si'                               },
  'alert_profile_update'      : {'eng': 'Profile updated Successfully',               'it':'Profilo aggiornato con successo'  },
  'alert_password_update'     : {'eng': 'Password Update Successfully',               'it':'Password aggiornato con Successo' },
  'alert_profile_update_error': {'eng': 'Password update failed, Please try again',   'it':'aggiornamento password fallito'   },



}


export{getLanguage}
