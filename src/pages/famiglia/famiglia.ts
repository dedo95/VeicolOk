import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Refresher} from 'ionic-angular';
import { AggiungiMembroPage } from '../aggiungi-membro/aggiungi-membro';
import {Famiglia} from "../../model/famiglia.model";
import {FamigliaService} from "../../services/famiglia.service";
import {Utente} from "../../model/utente.model";
import {UtenteService} from "../../services/utente.service";
import {FamigliarePage} from "../famigliare/famigliare";
import {ProfiloPage} from "../profilo/profilo";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertController:AlertController,
              public famigliaService:FamigliaService,
              private utenteService:UtenteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamigliaPage');
    this.utenteService.getUtente().subscribe((utente)=>{
      console.log(utente);
      this.utente=utente;
    });
    this.famigliaService.getFamiglia().subscribe(famiglia=>{
      this.famiglia=famiglia;
      console.log(famiglia);
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

  goAggiungi_Membro(){
    this.navCtrl.push(AggiungiMembroPage);
  }

  delete(famigliare) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i] == famigliare) {
        console.log("pippo");
        this.users.splice(i, 1);
      }
    }
    famigliare.img=null;
    this.famigliaService.delete(famigliare);
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
            this.famigliaService.getFamiglia().subscribe(famiglia=>{
              this.famiglia=famiglia;
              console.log(famiglia);
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
        }
      ]
    });
    await alert.present();
  }

  doRefresh(refresher: Refresher){
    this.famigliaService.getFamigliari().subscribe(famigliare =>{
      this.users=famigliare;
    });
    refresher.complete();
  }
}
