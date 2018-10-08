import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AggiungiveicoloPage } from '../aggiungiveicolo/aggiungiveicolo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  go_aggiungi_veicolo(){
    this.navCtrl.push(AggiungiveicoloPage);
  }

}
