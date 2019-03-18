import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

import {FamigliaService} from "../../services/famiglia.service";
import {Message_Response} from "../../model/message_response.model";


@IonicPage()
@Component({
  selector: 'page-aggiungi-membro',
  templateUrl: 'aggiungi-membro.html',
})
export class AggiungiMembroPage {

  private mex:Message_Response=new Message_Response();
  private email:string='';
  private messageTitle:string;
  private message:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public famigliaService: FamigliaService,
              public alertCtrl: AlertController,
              public translateService:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AggiungiMembroPage');
    this.translateService.get("AGGIUNGI_MEMBRO_TITLE").subscribe((data:string)=>{
      this.messageTitle=data;
    });
  }

  aggiungiMembroFamiglia(aggiungiMembro: NgForm){
    this.email=aggiungiMembro.value.email;
    this.famigliaService.aggiungi(this.email).subscribe((messaggio=>{
      this.mex =messaggio;
      let s="AGGIUNGI_MEMBRO_MESSAGE_"+this.mex.type;
      this.translateService.get(s).subscribe((data:string)=>{
        this.message=data;
      })
      this.creazioneOk(this.message);
    }));
  }

  creazioneOk(messaggio:string){
    let alert = this.alertCtrl.create({
      title: this.messageTitle,
      subTitle: messaggio,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

}
