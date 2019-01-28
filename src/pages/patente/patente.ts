import { Component } from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {PatenteService} from "../../services/patente.service";

@Component({
  selector: 'page-patenet',
  templateUrl: 'patente.html'
})
export class PatentePage {

  private patente={
    num_patente:'',
    categoria:'',
    punti:'',
    scadenza:''
  };
  private exist:boolean;

  constructor(public navCtrl: NavController, public patenteService:PatenteService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VeicoloPage');
    this.patenteService.getPatente().subscribe(patente=>{
      this.patente=patente;
      console.log(patente);
      if(this.patente==null){
        this.exist=true;
      }else{
        this.exist=false;
      }
    });
  }

  ionViewWillEnter(){
    this.patenteService.getPatente().subscribe(patente=>{
      this.patente=patente;
    });
  }

  doRefresh(refresher: Refresher){
    this.patenteService.getPatente().subscribe(patente=>{
      this.patente=patente;
      console.log(patente);
      if(this.patente==null){
        this.exist=true;
      }else {
        this.exist=false;
      }
      refresher.complete();
    });
  }

}
