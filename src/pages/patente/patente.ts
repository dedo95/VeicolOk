import { Component } from '@angular/core';
import {AlertController, NavController, Refresher} from 'ionic-angular';
import {PatenteService} from "../../services/patente.service";
import {Patente} from "../../model/patente.model";
import {NgForm} from "@angular/forms";
import {Scadenza} from "../../model/scadenza.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-patenet',
  templateUrl: 'patente.html'
})
export class PatentePage {

  private patente:Patente=new Patente();
  private p:Patente=new Patente();
  private exist:boolean;
  private type:string;
  private num:string;
  private points:string;
  private cancelButton: string;
  private saveButton:string;
  private title:string;

  constructor(public navCtrl: NavController,
              public patenteService:PatenteService,
              public alertController:AlertController,
              public translateService:TranslateService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatentePage');
    this.patenteService.getPatente().subscribe(patente=>{
      if(patente!==null){
        this.patente=patente.valueOf();
        this.exist=true;
        this.p=patente;
      }else{
        this.exist=false;
      }
    });
  }

  ionViewWillEnter(){
    this.patenteService.getPatente().subscribe(nuovaPatente=>{
      this.patente=nuovaPatente;
    });

  }

  salva(salvaForm: NgForm){
    this.patenteService.updatePatente(this.patente).subscribe((nuovaPatente)=>{
      this.p=nuovaPatente;
    });
  }

  elimina(){
    this.patenteService.deletePatente(new Patente());
    this.exist=false;
  }

  doRefresh(refresher: Refresher){
    this.patente=new Patente();
    this.patenteService.getPatente().subscribe(nuovaPatente=>{
      this.patente=nuovaPatente;
      console.log(this.patente);
      if(this.patente==null){
        this.exist=false;
      }else {
        this.exist=true;
      }
      refresher.complete();
    });
  }

  async presentAlertPrompt2() {
    this.translateService.get("CATEGORIA").subscribe((data:string)=>{
      this.type=data;
    });
    this.translateService.get("NUMERO_PATENTE").subscribe((data:string)=>{
      this.num=data;
    });
    this.translateService.get("PUNTI").subscribe((data:string)=>{
      this.points=data;
    });
    this.translateService.get("CANCEL_BUTTON").subscribe((data:string)=>{
      this.cancelButton=data;
    });
    this.translateService.get("SAVE_BUTTON").subscribe((data:string)=>{
      this.saveButton=data;
    });
    this.translateService.get("Crea Patente").subscribe((data:string)=>{
      this.title=data;
    });
    const alert = await this.alertController.create({
      title:this.title,
      inputs: [
        {
          name: 'categoria',
          type: 'text',
          placeholder: this.type
        },
        {
          name: 'numero',
          type: 'text',
          placeholder: this.num
        },
        {
          name: 'punti',
          type: 'number',
          min: 0,
          placeholder: this.points

        },
        {
          name: 'scadenza',
          type: 'date',
          placeholder: 'Scadenza'
        },

      ],

      buttons: [
        {
          text: this.cancelButton,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: this.saveButton,
          handler: data => {
            console.log('Confirm Ok');
            this.p.categoria=data.categoria;
            this.p.num_patente=data.numero;
            this.p.categoria=data.categoria;
            this.p.scadenza=data.scadenza;
            this.p.punti=data.punti;
            console.log("this.p "+this.p);
            this.patenteService.creaPatente(this.p);
            this.patente=this.p;
            this.exist=true;
          }
        }
      ]
    });
    await alert.present();
  }

}
