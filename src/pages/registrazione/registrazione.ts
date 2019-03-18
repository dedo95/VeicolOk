import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import { TranslateService} from "@ngx-translate/core";

import {UtenteService} from "../../services/utente.service";
import {LoginPage} from "../login/login";

import {Utente} from "../../model/utente.model";


@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {

  user:Utente=new Utente();
  registrazioneTitle: string;
  registrazioneSubTitle: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utenteService: UtenteService,
              public alertCtrl: AlertController,
              public translateService: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrazionePage');
    this.translateService.get('Registrazione_Title').subscribe((data) => {
      this.registrazioneSubTitle = data;
    });
    this.translateService.get('Registrazione_SubTitle').subscribe((data) => {
      this.registrazioneTitle = data;
    });
  }

  onLogin(loginForm: NgForm){
    this.user.nome=loginForm.value.nome;
    this.user.cognome=loginForm.value.cognome;
    let date=new Date(loginForm.value.nascita);
    this.user.d_nascita=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    this.user.email=loginForm.value.email;
    this.user.password=loginForm.value.password;
    this.utenteService.create(this.user);
    this.registrazioneOk();
  }

  registrazioneOk(){
    let alert = this.alertCtrl.create({
      title: this.registrazioneSubTitle,
      subTitle: this.registrazioneTitle,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.popTo(LoginPage);
  }

}
