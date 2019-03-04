import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public famigliaService: FamigliaService,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AggiungiMembroPage');
  }

  aggiungiMembroFamiglia(aggiungiMembro: NgForm){
    this.email=aggiungiMembro.value.email;
    this.famigliaService.aggiungi(this.email).subscribe((messaggio=>{
      console.log("WWWWWWWWW"+JSON.stringify(messaggio));
      this.mex =messaggio;
      console.log("2222222222"+JSON.stringify(this.mex));
      this.creazioneOk(this.mex.messaggio);
    }));

  }

  creazioneOk(messaggio:string){
    let alert = this.alertCtrl.create({
      title: 'Esito aggiungi membro',
      subTitle: messaggio,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

}
