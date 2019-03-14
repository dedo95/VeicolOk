import {Observable} from "rxjs";
import {URL} from "../constants";
import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Scadenza} from "../model/scadenza.model";


@Injectable()
export class ScadenzaService {
  scadenza: any;

  constructor(public http: HttpClient) {
  }

  getScadenza(targa:string, title:string):Observable<Scadenza>{
    console.log(title);
    let body={"targa": targa, "title" :title};
    return this.http.post<Scadenza>(URL.URL_SCADENZA,body,{ observe: 'response' })
      .map((resp :HttpResponse<Scadenza>)=> {
        return resp.body;
    });
  }

  updateScadenza(nuovaScadenza: Scadenza): Observable<Scadenza> {
    return this.http.post<Scadenza>(URL.URL_UPDATE_SCADENZA, nuovaScadenza, { observe: 'response' })
      .map((resp: HttpResponse<Scadenza>) => {
        return resp.body;
      });
  }

  creaScadenza(nuovaScadenza:Scadenza):Observable<Scadenza>{
    return this.http.post(URL.URL_CREA_SCADENZA,nuovaScadenza,{ observe: 'response' })
      .map((resp: HttpResponse<Scadenza>) => {
        return resp.body;
      });
  }

  eliminaScadenza(scadenza: Scadenza){
    return this.http.post<Scadenza>(URL.URL_ELIMINA_SCADENZA,scadenza).toPromise()
      .then((response:Scadenza)=>{
        return response;
      }).catch(error=>{ console.log(error)});
  }
}
