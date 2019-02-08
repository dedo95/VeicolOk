import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController} from "ionic-angular/umd";

/**
 * Generated class for the FamigliarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-famigliare',
  templateUrl: 'famigliare.html',
})
export class FamigliarePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController:AlertController) {
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad FamigliarePage');
  }

}
