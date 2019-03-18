import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-contattaci',
  templateUrl: 'contattaci.html',
})
export class ContattaciPage {

  private title:string;
  private message:string;

  constructor(public navCtrl: NavController,
              private translateService:TranslateService,
              public alertCtrl: AlertController) {
  }

  contattaci(){
    this.translateService.get("CONTATTACI_TITLE").subscribe((data:string)=>{
      this.title=data;
    });
    this.translateService.get("CONTATTACI_MSG").subscribe((data:string)=>{
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
