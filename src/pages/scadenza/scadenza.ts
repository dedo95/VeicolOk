import {Component, SystemJsNgModuleLoader} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Scadenza} from "../../model/scadenza.model";
import {ScadenzaService} from "../../services/scadenza.service";
import {NgForm} from "@angular/forms";
import {Veicolo} from "../../model/veicolo.model";
import {LoginPage} from "../login/login";
import {TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-scadenza',
  templateUrl: 'scadenza.html',
})
export class ScadenzaPage {

  private scadenze:Scadenza=new Scadenza();
  private isempty:boolean;
  private s:Scadenza=new Scadenza();
  private veicolo:Veicolo=new Veicolo();
  title:string='';
  private deleteButton: string;
  private cancelButton: string;
  private deleteTitle:string;
  private deleteMessage:string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private scadenzaService:ScadenzaService,
              public alertCtrl: AlertController,
              private translateservice:TranslateService
              ) {
  }

  ionViewDidLoad() {
    this.isempty=false;
    console.log('ionViewDidLoad ScadenzaPage');
    this.title=this.navParams.get('scadenza');
    this.veicolo.targa=this.navParams.get('targa');
    this.scadenzaService.getScadenza(this.navParams.get('targa'),this.navParams.get('scadenza')).subscribe(nuovascadenza=>{
      if (nuovascadenza!==null) {
        this.scadenze = nuovascadenza.valueOf();
        console.log(this.scadenze);
        this.s = nuovascadenza;
        console.log(this.s);
        this.isempty = true;
      }
    });
  }

  salva(salvaForm: NgForm){
    this.scadenze=this.s;
    this.scadenzaService.updateScadenza(this.scadenze).subscribe((nuovaScadenza:Scadenza)=>{
      this.scadenze=nuovaScadenza;
    });
    console.log(this.scadenze);
    this.modificaOk();
  }

  crea(creaForm:NgForm){
    this.scadenze.descrizione_scadenza=this.title;
    this.scadenze.importo=creaForm.value.importo;
    this.scadenze.data=creaForm.value.data;
    this.scadenze.veicolo=this.veicolo;
    this.scadenzaService.creaScadenza(this.scadenze).subscribe((nuovaScadenza:Scadenza)=>{
      this.s=nuovaScadenza;
      console.log(this.s);
    });
    this.isempty=true;
    this.creazioneOk();
  }

  elimina(){
    this.translateservice.get("DELETE_BUTTON").subscribe((data:string)=>{
      this.deleteButton=data;
    });
    this.translateservice.get("CANCEL_BUTTON").subscribe((data:string)=>{
      this.cancelButton=data;
    });
    this.translateservice.get("DELETE_SCADENZA_TITLE").subscribe((data:string)=>{
      this.deleteTitle=data;
    });
    this.translateservice.get("DELETE_SCADENZA_MESSAGE").subscribe((data:string)=>{
      this.deleteMessage=data;
    });
    let alert = this.alertCtrl.create({
      title: this.deleteTitle,
      subTitle: this.deleteMessage,
      buttons: [
        {
          text:this.deleteButton,
          handler :()=>{
            this.scadenzaService.eliminaScadenza(this.scadenze);
            this.scadenze=new Scadenza();
            this.isempty=false;
          }
        },
        {
          text:this.cancelButton,
          handler:()=>{

          }
        }
      ]
    });
    alert.present();

  }

  creazioneOk(){
    let alert = this.alertCtrl.create({
      title: 'Creazione avvenuta con successo',
      subTitle: this.title+' salvata con successo',
      buttons: ['OK']
    });
    alert.present();
  }

  modificaOk(){
    let alert = this.alertCtrl.create({
      title: 'Modifica Effettuata',
      subTitle: this.title+' è stata modificata con successo',
      buttons: ['OK']
    });
    alert.present();
  }


}
