import { Component } from '@angular/core';
import {NavController, NavParams, Refresher, ViewController} from 'ionic-angular';
import { AggiungiveicoloPage } from '../aggiungiveicolo/aggiungiveicolo';
import { InfoVeicoloPage } from '../info-veicolo/info-veicolo';
import { UtenteService } from '../../services/utente.service';
import { VeicoloService } from '../../services/veicolo.service';
import {Storage} from "@ionic/storage";
import {Veicolo} from "../../model/veicolo.model";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private veicoli: Array<Veicolo>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService, public veicoloService: VeicoloService, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VeicoloPage');
    this.utenteService.getUtente().subscribe((val)=>{
      console.log(val);
    });
      this.utenteService.getVeicoli().subscribe(veicolo=>{
        this.veicoli=veicolo;
      });
  }

  ionViewWillEnter(){
    this.utenteService.getVeicoli().subscribe(veicolo=>{
      this.veicoli=veicolo;
    });
  }

  doRefresh(refresher: Refresher){
    this.utenteService.getVeicoli().subscribe(veicolo=>{
      this.veicoli=veicolo;
      refresher.complete();
    });
  }

  openDetail(veicolo) {
    this.navCtrl.push(InfoVeicoloPage, veicolo);
    //console.log(utente);
  }

  delete(veicolo) {
    for (let i = 0; i < this.veicoli.length; i++) {
      if (this.veicoli[i] == veicolo) {
        console.log("pippo");
        this.veicoli.splice(i, 1);
      }
    }
    this.veicoloService.delete(veicolo);
  }
  
  go_aggiungi_veicolo(){
    this.navCtrl.push(AggiungiveicoloPage);
  }

}
