import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from "../constants";
import {Utente} from "../model/utente.model";
import {Message_Response} from "../model/message_response.model";

@Injectable()
export class FamigliaService {

  constructor(public http: HttpClient) {
  }

  creaFamiglia(name:string){
    console.log("Creazione Familgia");
    return this.http.post(URL.API_FAM,name).toPromise()
      .then((response: Response) => {
        return response.json();
      }).catch(error => { console.error() }
      );
  }

  getFamiglia(): Observable<any> {
    return this.http.get(URL.URL_FAMIGLIA);
  }

  getFamigliari(): Observable<any>{
    return this.http.get(URL.URL_FAMIGLIARI);
  }

  delete(famigliare: Utente){
    return this.http.post(URL.URL_FAMIGLIARE, famigliare).toPromise()
      .then((response: Response) => {
        return response.json();
      }).catch(error => { console.error() }
      );
  }

  aggiungi(email:string):Observable<Message_Response>{
    return this.http.post(URL.URL_AGGIUNGI,email,{ observe: 'response' })
      .map((resp :HttpResponse<Message_Response>)=>{
        return resp.body;
      });
  }

}
