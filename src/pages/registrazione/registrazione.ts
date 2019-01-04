import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {UtenteService} from "../../services/utente.service";
import {LoginPage} from "../login/login";
import { TranslateService} from "@ngx-translate/core";


@IonicPage()
@Component({
  selector: 'page-registrazione',
  templateUrl: 'registrazione.html',
})
export class RegistrazionePage {

  user={
    nome:'',
    cognome:'',
    d_nascita:'',
    email:'',
    password:'',
  };

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
    this.user.d_nascita=loginForm.value.nascita;
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
