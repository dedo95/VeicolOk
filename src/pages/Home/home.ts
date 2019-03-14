import { Component } from '@angular/core';
import {AlertController, ItemSliding, NavController, NavParams, Refresher} from 'ionic-angular';
import { AggiungiveicoloPage } from '../aggiungiveicolo/aggiungiveicolo';
import { InfoVeicoloPage } from '../info-veicolo/info-veicolo';
import { UtenteService } from '../../services/utente.service';
import { VeicoloService } from '../../services/veicolo.service';
import {Storage} from "@ionic/storage";
import {Veicolo} from "../../model/veicolo.model";
import {DomSanitizer} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private veicoli: Array<Veicolo>;
  private deleteButton: string;
  private cancelButton: string;
  private deleteTitle:string;
  private deleteMessage:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utenteService: UtenteService,
              public veicoloService: VeicoloService,
              public storage:Storage,
              private _DomSanitizationService: DomSanitizer,
              public alertCtrl: AlertController,
              public translateService:TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VeicoloPage');
    this.listaVeicoli();
  }

  ionViewWillEnter(){
    this.listaVeicoli();
  }

  doRefresh(refresher: Refresher){
    this.listaVeicoli();
    refresher.complete();
  }

  openDetail(veicolo) {
    this.navCtrl.push(InfoVeicoloPage, veicolo);
  }

  delete(veicolo: Veicolo, sliding:ItemSliding) {
    this.translateService.get("DELETE_BUTTON").subscribe((data:string)=>{
      this.deleteButton=data;
    });
    this.translateService.get("CANCEL_BUTTON").subscribe((data:string)=>{
      this.cancelButton=data;
    });
    this.translateService.get("DELETE_VEICOLO_TITLE").subscribe((data:string)=>{
      this.deleteTitle=data;
    });
    this.translateService.get("DELETE_VEICOLO_MESSAGE").subscribe((data:string)=>{
      this.deleteMessage=data;
    });
    let alert = this.alertCtrl.create({
      title: this.deleteTitle,
      subTitle: this.deleteMessage,
      buttons: [
        {
          text:this.deleteButton,
          handler :()=>{
            for (let i = 0; i < this.veicoli.length; i++) {
              if (this.veicoli[i] == veicolo) {
                this.veicoli.splice(i, 1);
              }
            }
            veicolo.img=null;
            this.veicoloService.delete(veicolo);
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

  go_aggiungi_veicolo(){
    this.navCtrl.push(AggiungiveicoloPage);
  }

  listaVeicoli(){
    this.utenteService.getVeicoli().subscribe(veicolo =>{
      this.veicoli=veicolo;
    });
  }

}
