import { Component } from '@angular/core';
import {NavController, NavParams, Refresher, ViewController} from 'ionic-angular';
import { AggiungiveicoloPage } from '../aggiungiveicolo/aggiungiveicolo';
import { InfoVeicoloPage } from '../info-veicolo/info-veicolo';
import { UtenteService } from '../../services/utente.service';
import { VeicoloService } from '../../services/veicolo.service';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private veicoli: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService, public veicoloService: VeicoloService, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VeicoloPage');
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

  openDetail(utente) {
    this.navCtrl.push(InfoVeicoloPage, utente);
    //console.log(utente);
  }

  delete(utente) {
    for (let i = 0; i < this.veicoli.length; i++) {
      if (this.veicoli[i] == utente) {
        this.veicoli.splice(i, 1);
      }
    }
  }
  
  go_aggiungi_veicolo(){
    this.navCtrl.push(AggiungiveicoloPage);
  }

}
