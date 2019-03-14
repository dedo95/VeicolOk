import { Component } from '@angular/core';
import {AlertController, IonicPage, ItemSliding, NavController, NavParams, Refresher} from 'ionic-angular';
import { AggiungiMembroPage } from '../aggiungi-membro/aggiungi-membro';
import {Famiglia} from "../../model/famiglia.model";
import {FamigliaService} from "../../services/famiglia.service";
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {FamigliarePage} from "../famigliare/famigliare";
import {ProfiloPage} from "../profilo/profilo";
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-famiglia',
  templateUrl: 'famiglia.html',
})
export class FamigliaPage {

  private famiglia:Famiglia=new Famiglia();
  private exist:boolean;
  private users:Array<Utente>;
  private utente:Utente=new Utente();
  private deleteButton: string;
  private cancelButton: string;
  private deleteTitle:string;
  private deleteMessage:string;
  private userImg:boolean;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertController:AlertController,
              public famigliaService:FamigliaService,
              private utenteService:UtenteService,
              public translateService:TranslateService,
              public alertCtrl: AlertController,
              private _DomSanitizationService: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamigliaPage');
    this.utenteService.getUtente().subscribe((utente)=>{
      this.utente=utente;
      if (utente.img.length===0)
        this.userImg=false;
      else this.userImg=true;
    });
    this.famigliaService.getFamiglia().subscribe(famiglia=>{
      this.famiglia=famiglia;
      if(this.famiglia==null){
        this.exist=true;
      }else{
        this.exist=false;
        this.famigliaService.getFamigliari().subscribe(famigliare=>{
          this.users=famigliare;
        });
      }
    });
  }

  ionViewWillEnter(){
    this.famigliaService.getFamigliari().subscribe(famigliare=>{
      this.users=famigliare;
    });
  }

  goAggiungi_Membro(){
    this.navCtrl.push(AggiungiMembroPage);
  }

  delete(famigliare, sliding:ItemSliding) {
    this.translateService.get("DELETE_BUTTON").subscribe((data:string)=>{
      this.deleteButton=data;
    });
    this.translateService.get("CANCEL_BUTTON").subscribe((data:string)=>{
      this.cancelButton=data;
    });
    this.translateService.get("DELETE_MEMBRO_TITLE").subscribe((data:string)=>{
      this.deleteTitle=data;
    });
    this.translateService.get("DELETE_MEMBRO_MSG").subscribe((data:string)=>{
      this.deleteMessage=data;
    });
    let alert = this.alertCtrl.create({
      title: this.deleteTitle,
      subTitle: this.deleteMessage,
      buttons: [
        {
          text:this.deleteButton,
          handler :()=>{
            for (let i = 0; i < this.users.length; i++) {
              if (this.users[i] == famigliare) {
                this.users.splice(i, 1);
              }
            }
            famigliare.img=null;
            this.famigliaService.delete(famigliare);
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

  openDetail(famigliare:Utente){
    this.navCtrl.push(FamigliarePage,famigliare);
  }

  openProfilo(){
    this.navCtrl.push(ProfiloPage);
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      title:'crea famiglia',
      inputs: [
        {
          name: 'nomeFamiglia',
          type: 'text',
          placeholder: 'Nome Famiglia'
        }
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Salva',
          handler: data => {
            console.log('Confirm Ok');
            this.famigliaService.creaFamiglia(data.nomeFamiglia);
            this.famiglia=new Famiglia();
            this.famiglia.nome=data.nomeFamiglia;
            this.exist=false;
          }
        }
      ]
    });
    await alert.present();
  }

  doRefresh(refresher: Refresher){
    this.utenteService.getUtente().subscribe((utente)=>{
      this.utente=utente;
      if (utente.img.length===0)
        this.userImg=false;
      else this.userImg=true;
    });
    this.famigliaService.getFamigliari().subscribe(famigliare =>{
      this.users=famigliare;
    });
    refresher.complete();
  }
}
