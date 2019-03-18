import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";

import {Intervento} from "../../model/intervento.model";

import {InterventoService} from "../../services/intervento.service";
import {Veicolo} from "../../model/veicolo.model";
import {ListainterventiPage} from "../listainterventi/listainterventi";


@IonicPage()
@Component({
  selector: 'page-intervento',
  templateUrl: 'intervento.html',
})
export class InterventoPage {

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
    let date=new Date(creaForm.value.scadenza);
    this.nuovoIntervento.data=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    this.nuovoIntervento.note=creaForm.value.note;
    this.nuovoIntervento.veicolo=this.veicolo;
    this.interventoService.creaIntervento(this.nuovoIntervento);
    this.intervento=this.nuovoIntervento;
    this.exist=true;
    this.navCtrl.popTo(ListainterventiPage);
  }

  modificaIntervento(){
    this.interventoService.updateIntervento(this.intervento);
  }


}
