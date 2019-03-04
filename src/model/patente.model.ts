import {Utente} from "./utente.model";

export class Patente {
    id_patente:string='';
    num_patente: string='';
    punti: string='';
    categoria: string='';
    scadenza: string='';
    utente:Utente=new Utente();
}
