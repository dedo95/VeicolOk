import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Intervento} from "../../model/intervento.model";
import {NgForm} from "@angular/forms";
import {InterventoService} from "../../services/intervento.service";
import {Veicolo} from "../../model/veicolo.model";
import {Scadenza} from "../../model/scadenza.model";
import {TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-aggiungiintervento',
  templateUrl: 'aggiungiintervento.html',
})
export class AggiungiinterventoPage {

  private intervento;
  private exist:boolean=false;
  private nuovoIntervento:Intervento=new Intervento();
  private veicolo:Veicolo=new Veicolo();



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private interventoService:InterventoService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AggiungiinterventoPage');
    this.intervento = this.navParams.get('intervento');
    console.log(this.intervento);
    if (this.intervento!==undefined) {
      this.exist = true;
    }
    this.veicolo.targa=this.navParams.get('targa');
  }

  creaIntervento(creaForm:NgForm){
    this.nuovoIntervento.descrizione=creaForm.value.descrizione;
    this.nuovoIntervento.importo=creaForm.value.importo;
    this.nuovoIntervento.città=creaForm.value.citta;
    this.nuovoIntervento.data=creaForm.value.scadenza;
    this.nuovoIntervento.note=creaForm.value.note;
    this.nuovoIntervento.veicolo=this.veicolo;
    this.interventoService.creaIntervento(this.nuovoIntervento);
    this.intervento=this.nuovoIntervento;
    this.exist=true;
  }


}
