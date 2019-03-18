import { Component } from '@angular/core';
import {AlertController, IonicPage, ItemSliding, NavController, NavParams, Refresher} from 'ionic-angular';

import {InterventoPage} from '../intervento/intervento';
import {Intervento} from "../../model/intervento.model";
import {InterventoService} from "../../services/intervento.service";
import {TranslateService} from "@ngx-translate/core";



@IonicPage()
@Component({
  selector: 'page-listainterventi',
  templateUrl: 'listainterventi.html',
})
export class ListainterventiPage {

  private interventi:Intervento[];
  private targa:string;
  private exist:boolean=false;
  private deleteButton: string;
  private cancelButton: string;
  private deleteTitle:string;
  private deleteMessage:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private interventiService: InterventoService,
              public alertCtrl: AlertController,
              private translateService:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListainterventiPage');
    this.getInterventi();
  }

  openIntervento(intervento){
    this.navCtrl.push(InterventoPage,{'intervento':intervento,'targa':this.targa});
  }

  ionViewWillEnter(){
    this.getInterventi();
  }

  doRefresh(refresher: Refresher){
    this.getInterventi();
    refresher.complete();
  }

  getInterventi(){
    this.targa=this.navParams.data;
    this.interventiService.getInterventi(this.targa).subscribe((data)=>{
      this.interventi = data;
      if (this.interventi.length!==0){
        this.exist=true;
      }
    });
  }

  elimina(intervento, sliding:ItemSliding){
    this.translateService.get("DELETE_BUTTON").subscribe((data:string)=>{
      this.deleteButton=data;
    });
    this.translateService.get("CANCEL_BUTTON").subscribe((data:string)=>{
      this.cancelButton=data;
    });
    this.translateService.get("DELETE_SCADENZA_TITLE").subscribe((data:string)=>{
      this.deleteTitle=data;
    });
    this.translateService.get("DELETE_SCADENZA_MESSAGE").subscribe((data:string)=>{
      this.deleteMessage=data;
    });
    let alert = this.alertCtrl.create({
      title: this.deleteTitle,
      subTitle: this.deleteMessage,
      buttons: [
        {
          text:this.deleteButton,
          handler :()=>{
            for (let i = 0; i < this.interventi.length; i++) {
              if (this.interventi[i] == intervento) {
                this.interventi.splice(i, 1);
              }
            }
            this.interventiService.eliminaIntervento(intervento);
            if (this.interventi.length===0)
              this.exist=false;
          }
        },
        {
          text:this.cancelButton,
          handler:()=>{
            sliding.close();
          }
        }
      ]
    });
    alert.present();
  }

}
