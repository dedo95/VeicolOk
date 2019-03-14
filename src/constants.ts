export const USE_PROXY = true;

export const API =  USE_PROXY ? 'api' :'http://10.0.2.2:8080/vok/api';

export const URL = {
    API_USER: API + '/getUtente',
    API_FAM: API + '/creaFamiglia',
    API_USE: API + '/creaUtente',
    URL_LOGIN: API + '/login',
    URL_VEICOLO: API + '/creaVeicolo',
    URL_VEICOLI: API+ '/getVeicoli',
    URL_DELETE: API+ '/deleteVeicolo',
    URL_PATENTE:API+ '/getPatente',
    URL_IMG:API+'/updateImage',
    URL_IM: API+'/updateimg',
    URL_UPDATE_PROFILO: API+'/updateProfilo',
    URL_UPDATE_VEICOLO: API+'/updateVeicolo',
    URL_FAMIGLIA:API+'/getFamiglia',
    URL_FAMIGLIARI:API+'/getFamigliari',
    URL_FAMIGLIARE: API+'/deleteFamigliare',
    URL_AGGIUNGI:API+'/aggiungiMembro',
    URL_SCADENZA:API+'/getScadenza',
    URL_UPDATE_SCADENZA:API+'/updateScadenza',
    URL_CREA_SCADENZA:API+'/creaScadenza',
    URL_ELIMINA_SCADENZA:API+'/deleteScadenza',
    URL_CREA_PATENTE:API+'/creaPatente',
    URL_UPDATE_PATENTE:API+'/updatePatente',
    URL_DELETE_PATENTE:API+'/deletePatente',
    URL_GET_INTERVENTI:API+'/getInterventi',
    URL_CREA_INTERVENTO:API+'/creaIntervento',
    URL_DELETE_INTERVENTO:API+'/deleteIntervento',
    URL_UPDATE_INTERVENTO:API+'/updateIntervento',
    //per cellulare
    URLL: 'http://192.168.1.9:8080/vok/getUtente',
    URI: 'http://192.168.1.9:8080/vok/creaUtente',
}

export const X_AUTH = "X-Auth";

export const AUTH_TOKEN = "auth-token";

export const UTENTE_STORAGE = "utente";

export const LINGUA = 'lingua';

