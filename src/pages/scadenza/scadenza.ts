import {Component, SystemJsNgModuleLoader} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Scadenza} from "../../model/scadenza.model";
import {ScadenzaService} from "../../services/scadenza.service";
import {NgForm} from "@angular/forms";
import {Veicolo} from "../../model/veicolo.model";
import {LoginPage} from "../login/login";


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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private scadenzaService:ScadenzaService,
              public alertCtrl: AlertController
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
        this.s = nuovascadenza;
        this.isempty = true;
      }
    });
  }

  salva(salvaForm: NgForm){
    this.scadenzaService.updateScadenza(this.s).subscribe((nuovaScadenza:Scadenza)=>{
      this.s=nuovaScadenza;
    });
    this.modificaOk();
  }

  crea(creaForm:NgForm){
    this.s.descrizione_scadenza=this.title;
    this.s.importo=creaForm.value.importo;
    this.s.data=creaForm.value.data;
    this.s.veicolo=this.veicolo;
    this.scadenzaService.creaScadenza(this.s);
    this.creazioneOk();
  }

  elimina(){
    this.scadenzaService.eliminaScadenza(this.scadenze);
    this.scadenze=new Scadenza();
    this.isempty=false;
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
