import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-recupera-psw',
  templateUrl: 'recupera-psw.html',
})
export class RecuperaPswPage {

  private title:string;
  private message:string;
  private email_account:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private translateService:TranslateService,
              private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperaPswPage');
  }

  recupra_password(){
    this.translateService.get("RECUPERA_PSW_TITLE").subscribe((data:string)=>{
      this.title=data;
    });
    this.translateService.get("RECUPERA_PSW_MSG").subscribe((data:string)=>{
      this.message=data;
    });
    let alert = this.alertCtrl.create({
      title: this.title,
      subTitle: this.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
