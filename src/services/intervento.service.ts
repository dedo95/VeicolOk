import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {URL} from "../constants";
import {Utente} from "../model/utente.model";
import {Message_Response} from "../model/message_response.model";
import {Intervento} from "../model/intervento.model";

@Injectable()
export class InterventoService {

  constructor(public http: HttpClient) {
  }

}
