import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Utente } from '../model/utente.model';
import {AUTH_TOKEN, URL, UTENTE_STORAGE, X_AUTH} from '../constants';
import { Storage } from '@ionic/storage';
import { fromPromise } from 'rxjs/observable/fromPromise';



@Injectable()
export class UtenteService {

  private tokenUtente: string;

    constructor(public http: HttpClient, public storage: Storage) {
      this.storage.get(AUTH_TOKEN).then((token) => {
        this.tokenUtente = token;
      });
    }

    getVeicoli(): Observable<any> {
        return this.http.get(URL.URL_VEICOLI);
    }

    create(user: Utente) {
        console.log("INIZIO");
        return this.http.post(URL.API_USE, user).toPromise()
            .then((response: Response) => {
                return response.json();
            }).catch(error => { console.error() }
            );
    }

  login(account: Account): Observable<Utente> {
    return this.http.post<Utente>(URL.URL_LOGIN, account, { observe: 'response' })
      .map((resp: HttpResponse<Utente>) => {
        console.log("resp: "+resp);
        const token = resp.headers.get(X_AUTH);
        console.log("token: "+token);
        this.storage.set(AUTH_TOKEN, token);
        this.tokenUtente = token;
        //Utente memorizzato nello storage in modo tale che se si vuole cambiare il
        //profilo dell'utente stesso non si fa una chiamata REST.
        this.storage.set(UTENTE_STORAGE, resp.body);
        console.log(resp.body);
        return resp.body;
      });
  }

  updateImage(image){
    return this.http.post(URL.URL_IMG,image,{ observe: 'response' }).toPromise()
      .then((response: HttpResponse<Utente>)=>{
        console.log(response.body);
          this.storage.set(UTENTE_STORAGE, response.body);
          return response;
      }).catch(error=> {console.log(error)});
  }

    stamp() {
        this.storage.get(UTENTE_STORAGE).then((val) => {
            console.log(val);
        });
    }

    logout() {
      this.tokenUtente = "";
      this.storage.remove(AUTH_TOKEN);
      this.storage.remove(UTENTE_STORAGE);
    }

    getUtente(): Observable<Utente> {
        return fromPromise(this.storage.get(UTENTE_STORAGE));
    }

  getUtenteToken(): string {
    return this.tokenUtente;
  }
}
export interface Account {
    username: string;
    password: string;
}
