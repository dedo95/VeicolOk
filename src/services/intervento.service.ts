import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from "../constants";
import {Intervento} from "../model/intervento.model";
import {Scadenza} from "../model/scadenza.model";


@Injectable()
export class InterventoService {

  constructor(public http: HttpClient) {
  }

  getInterventi(targa:string):Observable<Array<Intervento>>{
    return this.http.post(URL.URL_GET_INTERVENTI,targa,{ observe: 'response' })
      .map((resp :HttpResponse<Array<Intervento>>)=> {
        return resp.body;
      });
  }

  creaIntervento(nuovoIntervento:Intervento){
    return this.http.post<Intervento>(URL.URL_CREA_INTERVENTO,nuovoIntervento).toPromise()
      .then((response: Intervento) => {
        return response;
      }).catch(error => { console.error() }
      );

  }

  eliminaIntervento(intervento: Intervento){
    return this.http.post<Intervento>(URL.URL_DELETE_INTERVENTO,intervento).toPromise()
      .then((response:Intervento)=>{
        return response;
      }).catch(error=>{ console.log(error)});
  }

  updateIntervento(nuovoIntervento:Intervento){
    return this.http.post<Intervento>(URL.URL_UPDATE_INTERVENTO, nuovoIntervento).toPromise();
  }
}
