import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from "../constants";

@Injectable()
export class PatenteService{

  constructor(public http: HttpClient){
  }

  getPatente(): Observable<any> {
    return this.http.get(URL.URL_PATENTE);
  }

}
