import { Injectable } from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {URL, UTENTE_STORAGE} from '../constants';
import { Storage } from '@ionic/storage';
import {UtenteService} from "./utente.service";
import {Veicolo} from "../model/veicolo.model";
import {Observable} from "rxjs";


@Injectable()
export class VeicoloService {

    constructor(public http: HttpClient, public storage: Storage, public utenteService: UtenteService) {
    }

    create(veicolo: Veicolo) {
        this.utenteService.getUtente().subscribe((utente)=>{
          utente.img=null;
          veicolo.utente=utente;
          return this.http.post<Veicolo>(URL.URL_VEICOLO, veicolo).toPromise()
            .then((response: Veicolo) => {
              return response;
            }).catch(error => { console.error() }
            );
        });
    }

    delete(veicolo: Veicolo){
        return this.http.post<Veicolo>(URL.URL_DELETE, veicolo).toPromise()
          .then((response: Veicolo) => {
            return response;
          }).catch(error => { console.error() }
          );
    }

  updateImage(veicolo){
      let body={"img": veicolo.img, "targa" : veicolo.targa};
      return this.http.post(URL.URL_IM,body).toPromise()
      .then((response: HttpResponse<Veicolo>)=>{
        return response.body;
      }).catch(error=> {console.log(error)});
  }

  updateVeicolo(nuovoVeicolo: Veicolo): Observable<Veicolo> {
    return this.http.post<Veicolo>(URL.URL_UPDATE_VEICOLO, nuovoVeicolo, { observe: 'response' })
      .map((resp: HttpResponse<Veicolo>) => {
        return resp.body;
      });
  }
}
