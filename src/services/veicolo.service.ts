import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL } from '../constants';
import { Storage } from '@ionic/storage';
import { UTENTE_STORAGE } from '../constants';
import { Observable } from "rxjs";
import {UtenteService} from "./utente.service";


@Injectable()
export class VeicoloService {

    constructor(public http: HttpClient, public storage: Storage, public utenteService: UtenteService) {
    }

    create(veicolo: any) {
        console.log("INIZIO");
        console.log(veicolo.utente);
        this.utenteService.getUtente().subscribe((utente)=>{
          console.log(utente);
          veicolo.utente=utente;
          return this.http.post(URL.URL_VEICOLO, veicolo).toPromise()
            .then((response: Response) => {
              return response.json();
            }).catch(error => { console.error() }
            );
        })

    }
}
