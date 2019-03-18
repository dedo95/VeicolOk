import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Utente} from "../../model/utente.model";
import {DomSanitizer} from "@angular/platform-browser";



@IonicPage()
@Component({
  selector: 'page-famigliare',
  templateUrl: 'famigliare.html',
})
export class FamigliarePage {

  membro:Utente=new Utente();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _DomSanitizationService: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamigliarePage');
    this.membro=this.navParams.data;
    if (this.membro.img.length===0){
      this.membro.img = "../../assets/imgs/user.png";
    }
  }

}
