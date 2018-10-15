import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AggiungiMembroPage } from '../aggiungi-membro/aggiungi-membro';

@IonicPage()
@Component({
  selector: 'page-famiglia',
  templateUrl: 'famiglia.html',
})
export class FamigliaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamigliaPage');
  }

  goAggiungi_Membro(){
    this.navCtrl.push(AggiungiMembroPage);
  }

}
