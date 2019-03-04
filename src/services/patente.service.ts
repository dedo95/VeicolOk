import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from "../constants";
import {Patente} from "../model/patente.model";


@Injectable()
export class PatenteService{

  constructor(public http: HttpClient){
  }

  getPatente(): Observable<any> {
    return this.http.get(URL.URL_PATENTE);
  }


  updatePatente(patente:Patente):Observable<Patente>{
    return this.http.post<Patente>(URL.URL_UPDATE_PATENTE,patente,{ observe: 'response' })
      .map((resp: HttpResponse<Patente>) => {
        return resp.body;
      });
  }

  deletePatente(patente:Patente){
    console.log(this.http.post(URL.URL_DELETE_PATENTE,patente).toPromise());
  }

  creaPatente(patente:Patente){
    return this.http.post(URL.URL_CREA_PATENTE,patente).toPromise()
      .then((response: Response) => {
        return response.json();
      }).catch(error => { console.error() }
      );
  }


}
