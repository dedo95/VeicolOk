import { Component } from '@angular/core';
import {AlertController, NavController, Refresher} from 'ionic-angular';
import {PatenteService} from "../../services/patente.service";
import {Patente} from "../../model/patente.model";
import {NgForm} from "@angular/forms";
import {Scadenza} from "../../model/scadenza.model";

@Component({
  selector: 'page-patenet',
  templateUrl: 'patente.html'
})
export class PatentePage {

  private patente:Patente=new Patente();
  private p:Patente=new Patente();
  private exist:boolean;

  constructor(public navCtrl: NavController,
              public patenteService:PatenteService,
              public alertController:AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatentePage');
    this.patenteService.getPatente().subscribe(patente=>{
      console.log("Patente :"+JSON.stringify(patente));
      if(patente!==null){
        this.patente=patente.valueOf();
        console.log(this.patente);
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
    /*this.patenteService.getPatente().subscribe(nuovaPatente=> {
      this.patente = nuovaPatente;
      console.log(this.patente);
    });*/
  }

  elimina(){
    console.log("SSSSSSSSSSSSss");
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
    const alert = await this.alertController.create({
      title:'Crea patente',
      inputs: [
        {
          name: 'categoria',
          type: 'text',
          placeholder: 'Categoria'
        },
        {
          name: 'numero',
          type: 'text',
          placeholder: 'Numero patente'
        },
        {
          name: 'punti',
          type: 'number',
          min: 0,
          placeholder: 'Punti'

        },
        {
          name: 'scadenza',
          type: 'date',
          placeholder: 'Scadenza'
        },

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
            this.p.categoria=data.categoria;
            this.p.num_patente=data.numero;
            this.p.categoria=data.categoria;
            this.p.scadenza=data.scadenza;
            this.p.punti=data.punti;
            console.log("this.p "+this.p);
            this.patenteService.creaPatente(this.p);
            this.patente=this.p;
            /*this.patenteService.getPatente().subscribe(nuovaPatente=>{
              this.patente=nuovaPatente;
              console.log("this.patente :"+this.patente);
              if(this.patente==null){
                this.exist=false;
              }else{
                this.exist=true;
              }
            });*/
            this.exist=true;
          }
        }
      ]
    });
    await alert.present();
  }

}
