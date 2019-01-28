import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoVeicoloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-veicolo',
  templateUrl: 'info-veicolo.html',
})
export class InfoVeicoloPage {

  veicolo = {
    targa: '',
    alimentazione: '',
    anno_immatricolazione: '',
    cavalli: '',
    cilindrata: '',
    colore: '',
    descrizione: '',
    img: '',
    kw: '',
    tipologia: '',
    utente: {}
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoVeicoloPage');
    this.veicolo=this.navParams.data;
    console.log(this.veicolo);
  }

}
