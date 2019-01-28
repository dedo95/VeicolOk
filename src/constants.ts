export const USE_PROXY = true;

export const API =  USE_PROXY ? 'api' :'http://127.0.0.1:8080/vok/api';

export const URL = {
    API_USER: API + '/getUtente',
    API_PAT: API + '/creaFamigliaa',
    API_USE: API + '/creaUtente',
    URL_LOGIN: API + '/login',
    URL_VEICOLO: API + '/creaVeicolo',
    URL_VEICOLI: API+ '/getVeicoli',
    URL_DELETE: API+ '/deleteVeicolo',
    URL_PATENTE:API+ '/getPatente',
    //per cellulare
    URLL: 'http://192.168.1.9:8080/vok/getUtente',
    URI: 'http://192.168.1.9:8080/vok/creaUtente',
}

export const X_AUTH = "X-Auth";

export const AUTH_TOKEN = "auth-token";

export const UTENTE_STORAGE = "utente";

export const LINGUA = 'lingua';
