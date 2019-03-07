import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AggiungiinterventoPage } from '../aggiungiintervento/aggiungiintervento';

/**
 * Generated class for the ListainterventiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listainterventi',
  templateUrl: 'listainterventi.html',
})
export class ListainterventiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListainterventiPage');
  }
  go_aggiungi_intervento(){
    this.navCtrl.push(AggiungiinterventoPage);
  }

}
