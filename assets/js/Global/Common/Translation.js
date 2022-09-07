// Funzione che recupera la lingua scelta dall'utente
// e sostituisce tutti i testi della pagina
function getLanguage(){
  // Recupera il valore di language salvato dal client
  let select_language = localStorage.getItem("select_language")
  let select_language_complete = localStorage.getItem("select_language_complete")
  $("#dropdown1").text(select_language_complete)
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
  console.log($(this).attr('id'))
  console.log($(this).attr('value'))
  $("#dropdown1").text($(this).attr('value'))

  // Recupera l'id della lingua selezionata.
  // l'id ha il codice della lingua (es. en, it, es, fr).
  let select_language = $(this).attr('id')
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
  'dryers'               : { 'en':'Dryers',               'it':'Celle'                },
  'recipe'               : { 'en':'Recipe',               'it':'Ricetta'              },
  'dryer'                : { 'en':'Dryer',                'it':'Cella'                },
  'recipe_in_use'        : { 'en':'Recipe in Use',        'it':'Ricetta in Uso'       },
  'list_production'      : { 'en':'List Productions',     'it':'Lista Produzioni'     },
  'recipe_name'          : { 'en':'Recipe Name',          'it':'Nome Ricetta'         },
  'duration'             : { 'en':'Duration',             'it':'Durata'               },
  'start_production'     : { 'en':'Start Production',     'it':'Inizio Produzione'    },
  'end_production'       : { 'en':'End Production',       'it':'Fine Produzione'      },
  'line_details'         : { 'en':'Line Details',         'it':'Dettagli Linea'       },
  'extruder_pressure'    : { 'en':'Extruder Pressure',    'it':'Pressione_Estrusore'  },
  'cylinder_temperature' : { 'en':'Cylinder Temperature', 'it':'Temperatura Cilindro' },
  'head_temperature'     : { 'en':'Head Temperature',     'it':'Temperatura Testata'  },
  'trend_line'           : { 'en':'Trend Line',           'it':'Grafico Linea'        },
  'history_line'         : { 'en':'History Line',         'it':'Storico Linea'        },
  'dryer_1'              : { 'en':'Dryer 01',             'it':'Cella 01'             },
  'dryer_2'              : { 'en':'Dryer 02',             'it':'Cella 02'             },
  'dryer_3'              : { 'en':'Dryer 03',             'it':'Cella 03'             },
  'dryer_4'              : { 'en':'Dryer 04',             'it':'Cella 04'             },
  'dryer_5'              : { 'en':'Dryer 05',             'it':'Cella 05'             },
  'dryer_6'              : { 'en':'Dryer 06',             'it':'Cella 06'             },
  'dryer_7'              : { 'en':'Dryer 07',             'it':'Cella 07'             },
  'dryer_8'              : { 'en':'Dryer 08',             'it':'Cella 08'             },
  'dryer_9'              : { 'en':'Dryer 09',             'it':'Cella 09'             },
  'dryer_10'              : { 'en':'Dryer 10',             'it':'Cella 10'             },
  'dryer_11'              : { 'en':'Dryer 11',             'it':'Cella 11'             },
  'dryer_12'              : { 'en':'Dryer 12',             'it':'Cella 12'             },
  'dryer_13'              : { 'en':'Dryer 13',             'it':'Cella 13'             },
  'dryer_14'              : { 'en':'Dryer 14',             'it':'Cella 14'             },
  'dryer_15'              : { 'en':'Dryer 15',             'it':'Cella 15'             },
  'dryer_16'              : { 'en':'Dryer 16',             'it':'Cella 16'             },

  // Pagina Info
  'dryers_group'                     : { 'en':'Dryers Group',                     'it':'Gruppo Celle'                     },
  'dryers_in_processing'             : { 'en':'Dryers in Processing',             'it':'Celle in Essicazione'             },
  'work_time'                        : { 'en':'Work Time',                        'it':'Tempo di Lavoro'                  },
  'consumption'                      : { 'en':'Consumption',                      'it':'Consumi'                          },
  'pasta_line'                       : { 'en':'Pasta Line',                       'it':'Linea Pasta'                      },
  'hourly_production'                : { 'en':'Hourly Production',                'it':'Produzione Oraria'                },
  'expected_production'              : { 'en':'Expected Production',              'it':'Produzione Prevista'              },
  'completed_production'             : { 'en':'Completed Production',             'it':'Produzione Completata'            },
  'estimated_time_of_end_production' : { 'en':'Estimated Time of End Production', 'it':'Tempo stimato di fine produzione' },

  // Pagina DryersInfo
  'days'                      : { 'en':'days',                      'it':'giorni'                  },
  'producted_line'            : { 'en':'Producted Line',            'it':'Produzione Linea'        },
  'dryers_energy_consumption' : { 'en':'Dryers Energy Consumption', 'it':'Energia Consumata Celle' },

  // Pagina DryersInfo
  'recipe_time' : { 'en':'Recipe Time', 'it':'Tempo Ricetta'  },
  'worked_time' : { 'en':'Worked Time', 'it':'Tempo lavorato' },
  'trolleys'    : { 'en':'Trolleys',    'it':'Carrelli'       },

  // Pagina DryersDetails
  'dryer_details'               : { 'en':'Dryer Details',               'it':'Dettaglio Cella'            },
  'dryer_number'                : { 'en':'Dryer Number',                'it':'Numero Cella'               },
  'number_of_trolley'           : { 'en':'Number of Trolley',           'it':'Numero di Carrelli'         },
  'dryer_status'                : { 'en':'Dryer Status',                'it':'Stato Cella'                },
  'total_drying_time'           : { 'en':'Total Drying Time',           'it':'Tempo Totale Essiccazione'  },
  'current_phase_time'          : { 'en':'Current Phase Time',          'it':'Tempo Fase Attuale'         },
  'dryers_info'                 : { 'en':'DRYER INFO',                  'it':'DATI CELLA'                 },
  'dryer_graph'                 : { 'en':'DRYER GRAPH',                 'it':'GRAFICO CELLA'              },
  'drying_graphic'              : { 'en':'Drying graphic',              'it':'Grafico Essiccazione'       },
  'dryer_history_graph'         : { 'en':'DRYER HISTORY GRAPH',         'it':'GRAFICO STORICO CELLA'      },
  'start_drying'                : { 'en':'BEGINNING OF DESICCATION',    'it':'Inizio Essiccazione'        },
  'end_drying'                  : { 'en':'END OF  DESICCATION',          'it':'Fine Essiccazione'         },
  'drying_graph'                : { 'en':'Drying Graph',                'it':'Grafico Essiccazione'       },
  'total_calories'              : { 'en':'Total Calories Consumed',     'it':'Calorie Totali Consumate'   },
  'average_ambient_temperature' : { 'en':'Average Ambient Temperature', 'it':'Temperatura Ambiente Media' },
  'average_ambient_umidity'     : { 'en':'Average Ambient Umidity',     'it':'Umidità Ambiente Media'     },
  'phase'                       : { 'en':'Phase',                       'it':'Fase'                       },
  'phase_time'                  : { 'en':'Phase Time',                  'it':'Tempo Fase'                 },
  'delta_t'                     : { 'en':'Delta T',                     'it':'Delta T'                    },
  'temperature_sp'              : { 'en':'Temperature SP',              'it':'SP Temperatura'             },
  'umidity_sp'                  : { 'en':'Umidity SP',                  'it':'SP Umidità'                 },
  'fans_speed'                  : { 'en':'Fans Speed',                  'it':'Velocità Ventole'           },
  'fans_work_time'              : { 'en':'Fans Work Time',              'it':'Tempo Lavoro Ventole'       },
  'fans_pause_time'             : { 'en':'Fans Pause Time',             'it':'Tempo Pausa Ventole'        },
  'current_recipe'              : { 'en':'Current Recipe',              'it':'Ricetta in uso'             },
  'actual_prodcution'           : { 'en':'Actual Production',           'it':'Produzione Attuale'         },
  'recipe_name'                 : { 'en':'Recipe Name',                 'it':'Nome Ricetta'               },
  'duration'                    : { 'en':'Duration',                    'it':'Durata'                     },
  'dryer_history'               : { 'en': 'Dryer History',              'it': 'Storico Cella'             },
  'actual_pressure'             : { 'en': 'Actual Pressure',            'it': 'Pressione Attuale'         },
  'liquid_quantity'             : { 'en': 'SP Liquid Quantity',         'it': 'SP Quantità Liquida'       },
  'quantity_of_flour'           : { 'en': 'Amount of Flour',            'it': 'Quantità Sfarinati'        },
  'average_production'          : { 'en':'Actual Average Production Last Hour', 'it': 'Produzione Media Effettiva Ultima Ora'},
  'SP_production'               : { 'en': 'SP Production', 'it': 'SP Produzione'                          },
  'quantity_produced'           : { 'en': 'Amount Produced', 'it':'Quantità Prodotta'                     },

  // Pagina LinesInfo
  'hourly_quantity_flours_set'  : { 'en':'Hourly quantity Flours Set',  'it':'Portata Sfarinati Impostata' },
  'hourly_quantity_liquids_set' : { 'en':'Hourly quantity Liquids Set', 'it':'Portata Liquidi Impostata'   },
  'producted_quantity'          : { 'en':'Producted Quantity',          'it':'Quantità Prodotta'           },
  'actual_production'           : { 'en':'Actual Production',           'it':'Produzione Attuale'          },
  'actual_extruder_pression'    : { 'en':'Actual Extruder Pression',    'it':'Pressione Estrusore Attuale' },
  'daily_production'            : { 'en':'Daily Production',            'it':'Produzione Giornaliera'      },
  'actual_production'           : { 'en':'Actual Production',           'it':'Produzione Attuale'          },
  'actual_alarms'               : { 'en':'Actual Alarms',               'it':'Allarmi Attuale'             },
  'machine_list'                : { 'en':'Machine List',                'it':'Lista Macchine'              },
  'machine_status'              : { 'en':'Machine Status',              'it':'Stato Macchina'              },
  'number_of_alarms'            : { 'en':'Numbers of Alarms Present',   'it':'Numeri Allarmi Presenti'     },
  'Recipe_set'                  : { 'en':'Recipe Set',                  'it':'Ricetta Impostata'           },
  'dough'                       : { 'en':'Dough',                       'it':'Impasto'                     },
  'spreader'                    : { 'en':'Spreader',                    'it':'Stenditrice'                 },
  'pasta-instant'               : { 'en':'Pasta Instant',               'it':'Pasta Instant'               },
  'tray-feeder'                 : { 'en':'Tray Feeder',                 'it':'Avanzamento Telai'           },
  'destacker-robot'             : { 'en':'Destacker Robot',             'it':'Robot Deimpilatore'          },
  'omnidryer'                   : { 'en':'Omnidryer',                   'it':'Omnidryer'                   },
  'extruder'                    : { 'en':'Extruder',                    'it':'Pressa'                      },
  'tray-stacker'                : { 'en':'Tray Stacker',                'it':'Impilatore'                  },
  'pre-dryer'                   : { 'en':'Pre Dryer',                   'it':'Trabatto'                    },
  'omnidryer_history'           : { 'en':'Omnidryer History',           'it':'Storico Omnidryer'           },

  // Pagina dough
  'dough_info'           : { 'en':'Dough Info',              'it':'Dati Impasto'                    },
  'total_dough'          : { 'en':'Total Dough',             'it':'Impasto Totale'                  },
  'flour_dousing_1'      : { 'en':'Flour Dosing 1',          'it':'Dosaggio Sfarinato 1'            },
  'water_dosing'         : { 'en':'Water Dosing',            'it':'Dosaggio Acqua'                  },
  'liquid_dosing_1'      : { 'en':'Liquid Dosing 1',         'it':'Dosaggio Liquido 1'              },
  'water_temperature'    : { 'en':'Water Temperature',       'it':'Temperatura Acqua'               },
  'tank_vacuum'          : { 'en':'Tank Vacuum',             'it':'Vuoto Vasca'                     },
  'level_tank'           : { 'en':'Level_Tank',              'it':'Livello Vasca'                   },
  'trend_dough'          : { 'en':'Trend Dough',             'it':'Grafico Impasto'                 },
  'dough_data'           : { 'en':'Instant Dough Data',      'it':'Dati Impasto Istantanei'         },
  'dough_set_point'      : { 'en':'Dough Set Point',         'it':'Set Point Impasto'               },
  'liquid'               : { 'en':'Liquid',                  'it':'Liquidi'                         },
  'Uovo'                 : { 'en':'Egg or Liquid Dye',       'it':'Uovo (o Liquido Colorante)'      },
  'group_dashboard'      : { 'en':'Dough Group Dashboard',   'it': 'Dashboard Gruppo Impasto'       },
  'history_group'        : { 'en':'Dough Group History',     'it':'Storico Gruppo Impasto'          },
  'production_list'      : { 'en':'List of Historical Productions', 'it':'Lista Produzioni Storiche'},
  'start_production'     : { 'en':'Production Start',        'it':'Inizio Produzione'               },
  'end_production'       : { 'en':'Production End',          'it':'Fine Produzione'                 },
  'history_chart'        : { 'en':'History Chart',           'it':'Grafico Storico'                 },
  // Pagina Extruder
  'extruder_info'         : { 'en':'Extruder Info',          'it':'Dettagli Pressa'},
  'trend_extruder'        : { 'en':'Trend Extruder',         'it':'Grafico Pressa' },
  'flour'                 : { 'en':'Flour',                  'it':'Sfarinati'      },
  'dough_details'         : { 'en':'Dough Details',          'it':'Dettaglio Impasto'},
  'dashboard_extruder'    : { 'en':'Dashboard Extruder',     'it':'Dashboard Estrusore' },
  'extruder_history'      : { 'en':'Extruder History',       'it':'Storico Estrusore'},
  'dati_vite'             : { 'en':'Instant Screw Data',     'it':'Dati vite Instantanei'},


  // Pagina Omnidryer
  'omnidryer_details'   : { 'en':'Omnidryer Details',   'it':'Dati Omnidryer'      },
  'omnidryer_info'      : { 'en':'Omnidryer Info',      'it':'Dati Omnidryer'      },
  'sticks_in_tunnel'    : { 'en':'Omnidryer Info',      'it':'Dati Omnidryer'      },
  'sticks_produced'     : { 'en':'Sticks Produced',     'it':'Canne Prodotte'      },
  'stage_1_temperature' : { 'en':'Stage 1 Temperature', 'it':'Stage 1 Temperatura' },
  'stage_2_temperature' : { 'en':'Stage 2 Temperature', 'it':'Stage 2 Temperatura' },
  'stage_3_temperature' : { 'en':'Stage 3 Temperature', 'it':'Stage 3 Temperatura' },
  'stage_1_humidity'    : { 'en':'Stage 1 Humidity',    'it':'Stage 1 Umidità'     },
  'stage_2_humidity'    : { 'en':'Stage 2 Humidity',    'it':'Stage 2 Umidità'     },
  'stage_3_humidity'    : { 'en':'Stage 3 Humidity',    'it':'Stage 3 Umidità'     },
  'trend_omnidryer'     : { 'en':'Trend Omnidryer',     'it':'Grafico Omnidryer'   },

  // Pagina Pasta-instant
  'pasta_instant_details' : { 'en':'Pasta Instant Details', 'it':'Dati Pasta Instant'    },
  'pasta_instant_info'    : { 'en':'Pasta Instant Info',    'it':'Dati Pasta Instant'    },
  'cooking_time'          : { 'en':'Cooking Time',          'it':'Tempo Cottura'         },
  'room_temperature'      : { 'en':'Room Temperature',      'it':'Temperatura Camera'    },
  'steam_flow'            : { 'en':'Steam Flow',            'it':'Flusso Vapore'         },
  'trend_pasta_instant'   : { 'en':'Trend Pasta Instant',   'it':'Grafico Pasta Instant' },
  'pasta_instant'         : { 'en': 'Pasta Instant',        'it':'Pasta Instant'         },
  'steam_flow'            : { 'en': 'Steam Flow',           'it':'Fusso Vapore'          },

  // Pagina Pre-DRYER
  'pre_dryer_details'     : { 'en':'Pre-Dryer Details', 'it':'Dati Trabatto'        },
  'pre_dryer_info'        : { 'en':'Pre-Dryer Info',    'it':'Dati Trabatto'        },
  'pre_dryer_temperature' : { 'en':'Pre-Dryer Info',    'it':'Temperatura Trabatto' },
  'trend_pre_dryer'       : { 'en':'Trend Pre-Dryer',   'it':'Grafico Trabatto'     },
  'pre_dryer_history'     : { 'en':'Pre-Dryer History', 'it':'Storico Predryer'     },

  // Pagina Spreader
  'spreader_details'  : { 'en':'Spreader Details',  'it':'Dati Stenditrice'    },
  'spreader_info'     : { 'en':'Spreader Info',     'it':'Dati Stenditrice'    },
  'stick_weight'      : { 'en':'Stick Weight',      'it':'Peso Canna'          },
  'time_stick'        : { 'en':'Time Stick',        'it':'Tempo Canna'         },
  'sticks_for_minute' : { 'en':'Sticks For Minute', 'it':'Canne per Minuto'    },
  'produced_sticks'   : { 'en':'Produced Sticks',   'it':'Canne Prodotte'      },
  'trend_spreader'    : { 'en':'Trend Spreader',    'it':'Grafico Stenditrice' },
  'spreader_history'  : { 'en':'Spreader History',  'it':'Storico Stenditrice' },

  // Pagina Trail feeder
  'tray_feeder_details' : { 'en':'Tray-Feeder Details', 'it':'Dati Avanzamento Telai'    },
  'tray_feeder_info'    : { 'en':'Tray-Feeder Info',    'it':'Dati Avanzamento Telai'    },
  'trays_for_minute'    : { 'en':'Trays for Minute',    'it':'Telai per Minuto'          },
  'motor_speed'         : { 'en':'Motor Speed',         'it':'Velocità Motore'           },
  'trend_tray_feeder'   : { 'en':'Trend Tray-Feeder',   'it':'Grafico Avanzamento Telai' },
  'trend_tray_feeder'   : { 'en':'Trend Tray-Feeder',   'it':'Grafico Avanzamento Telai' },
  'tray_feeder_history' : { 'en':'Tray Feeder History', 'it':'Storico Avanzamento Telai' },
  // SideBar menu
  'machines'                  : {'en':'Machines',       'it':'Macchine'                  },
  'alarms'                    : {'en':'Alarms',         'it':'Allarmi'                   },
  'alarms_history'            : {'en':'Alarm History',  'it':'Storico Alarmi'            },
  'profile_settings'          : {'en':'Profile Settings','it':'Impostazione del Profilo' },
  'clients_list'              : {'en' : 'List of Clients','it':'Lista CLienti'           },
  // Pagina Customer
  'list_clients_connected'    : {'en': 'List of Clients Connected',    'it' : 'Lista Clienti Connessi'   },
  'list_clients_disconnected' : {'en': 'List of Clients Disconnected', 'it': 'Lista Clienti Disconnessi' },
  'connection_status'         : {'en' : 'Connection Status',           'it':'Stato Connessione'          },
  'dryers'                    : {'en' : 'Dryers',                      'it':'Celle'                      },
  'line'                      : {'en' : 'Line',                        'it':'Linea'                      },
  //pagine profilo
  'firsname'                  : {'en': 'firstname',                                  'it':'Nome'                             },
  'lastname'                  : {'en': 'lastname',                                   'it':'Cognome'                          },
  'name'                      : {'en': 'Name',                                       'it':'Nome'                             },
  'lastname'                  : {'en': 'Surname',                                    'it':'Cognome'                          },
  'email'                     : {'en': 'Email',                                      'it':'Email'                            },
  'company'                   : {'en': 'Company Name',                               'it':'Nome Azienda'                     },
  'mobile'                    : {'en': 'Mobile phone',                               'it':'Numero Cellulare'                 },
  'personalInfo'              : {'en': 'Personal Info',                              'it':'Informazioni Personali'           },
  'submit'                    : {'en': 'Submit',                                     'it':'Salva'                            },
  'state'                     : {'en': 'State/Country',                              'it':'Stato/Paese'                      },
  'profile_settings'          : {'en': 'Profile Settings',                           'it':'Impostazione Profilo'             },
  'update_btn_profile'        : {'en': 'Update Profile Info',                        'it':'Aggiorna informazione profilo'    },
  'change_password'           : {'en': 'Change Password',                            'it':'Cambio Password'                  },
  'old'                       : {'en': 'Old Password',                               'it':'Vecchia Password'                 },
  'new'                       : {'en': 'New Password ',                              'it':'Nuova Password'                   },
  'update_heading'            : {'en': 'Update Password',                            'it':'Aggiorna Password'                },
  'update_btn'                : {'en': 'Update Password',                            'it':'Aggiorna Password'                },
  'notification'              : {'en': 'Allow notification',                         'it':'Abilita notifiche'                },
  'theme'                     : {'en': 'Change theme',                               'it':'Cambia tema'                      },
  'no'                        : {'en': 'No',                                         'it':'No'                               },
  'yes'                       : {'en': 'Yes',                                        'it':'Si'                               },
  'alert_profile_update'      : {'en': 'Profile updated Successfully.',               'it':'Profilo aggiornato con successo.'  },
  'alert_profile_update_error'      : {'en': 'Error profile updated.',                      'it':'Errore nell\' aggiornare il profilo.'  },
  'alert_password_update'     : {'en': 'Password Update Successfully.',               'it':'Password aggiornato con Successo.' },
  'alert_profile_update_error': {'en': 'Password update failed, Please try again.',   'it':'Aggiornamento password fallito.'   },
  'language'                  : {'en': 'Change langauge ',                           'it':'Cambia lingua'                    },
  'issues'                    : {'en': 'Report an Issue',                            'it':'Segnala problema'                 }
}
export{getLanguage}
