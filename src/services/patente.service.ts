import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from "../constants";
import {Patente} from "../model/patente.model";


@Injectable()
export class PatenteService{

  constructor(public http: HttpClient){
  }

  getPatente(): Observable<Patente> {
    return this.http.get<Patente>(URL.URL_PATENTE);
  }


  updatePatente(patente:Patente):Observable<Patente>{
    return this.http.post<Patente>(URL.URL_UPDATE_PATENTE,patente,{ observe: 'response' })
      .map((resp: HttpResponse<Patente>) => {
        return resp.body;
      });
  }

  deletePatente(patente:Patente){
    this.http.post<Patente>(URL.URL_DELETE_PATENTE,patente).toPromise();
  }

  creaPatente(patente:Patente){
    return this.http.post<Patente>(URL.URL_CREA_PATENTE,patente).toPromise()
      .then((response: Patente) => {
        return response;
      }).catch(error => { console.error() }
      );
  }


}
