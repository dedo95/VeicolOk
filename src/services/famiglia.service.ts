import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from "../constants";
import {Utente} from "../model/utente.model";
import {Message_Response} from "../model/message_response.model";
import {Famiglia} from "../model/famiglia.model";

@Injectable()
export class FamigliaService {

  constructor(public http: HttpClient) {
  }

  creaFamiglia(name:string){
    return this.http.post(URL.API_FAM,name).toPromise()
      .then((response: Response) => {
        return response.json();
      }).catch(error => { console.error() }
      );
  }

  getFamiglia(): Observable<Famiglia> {
    return this.http.get<Famiglia>(URL.URL_FAMIGLIA);
  }

  getFamigliari(): Observable<Array<Utente>>{
    return this.http.get<Array<Utente>>(URL.URL_FAMIGLIARI);
  }

  delete(famigliare: Utente){
    return this.http.post<Utente>(URL.URL_FAMIGLIARE, famigliare).toPromise()
      .then((response: Utente) => {
        return response;
      }).catch(error => { console.error() }
      );
  }

  aggiungi(email:string):Observable<Message_Response>{
    return this.http.post<Message_Response>(URL.URL_AGGIUNGI,email,{ observe: 'response' })
      .map((resp :HttpResponse<Message_Response>)=>{
        return resp.body;
      });
  }

}
