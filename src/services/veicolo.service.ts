import { Injectable } from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {URL, UTENTE_STORAGE} from '../constants';
import { Storage } from '@ionic/storage';
import {UtenteService} from "./utente.service";
import {Veicolo} from "../model/veicolo.model";
import {Utente} from "../model/utente.model";
import {toPromise} from "rxjs/operator/toPromise";
import {Observable} from "rxjs";


@Injectable()
export class VeicoloService {

    constructor(public http: HttpClient, public storage: Storage, public utenteService: UtenteService) {
    }

    create(veicolo: Veicolo) {
        console.log("INIZIO");
        console.log(veicolo.utente);
        this.utenteService.getUtente().subscribe((utente)=>{
          console.log("Utente :"+ utente.img);
          utente.img=null;
          veicolo.utente=utente;
          console.log("Veicolo : "+veicolo.utente.img);
          return this.http.post(URL.URL_VEICOLO, veicolo).toPromise()
            .then((response: Response) => {
              return response.json();
            }).catch(error => { console.error() }
            );
        });

    }

    delete(veicolo: Veicolo){
      console.log("INIZIO" + veicolo);
        return this.http.post(URL.URL_DELETE, veicolo).toPromise()
          .then((response: Response) => {
            return response.json();
          }).catch(error => { console.error() }
          );
    }

  updateImage(veicolo){
      console.log("SAAAAAAAAAAAAAA : "+veicolo.targa);
      console.log("SAAAAAAAAAAaaaa : "+veicolo.img);
      let body={"img": veicolo.img, "targa" : veicolo.targa};
      return this.http.post(URL.URL_IM,body).toPromise()
      .then((response: HttpResponse<Veicolo>)=>{
        console.log("BODYYYYYYYYYY : "+response.body);
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
