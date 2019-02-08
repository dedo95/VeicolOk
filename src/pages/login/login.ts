import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { RegistrazionePage } from '../registrazione/registrazione';
import { RecuperaPswPage } from '../recupera-psw/recupera-psw';
import { Account, UtenteService } from '../../services/utente.service';
import {HttpErrorResponse} from "@angular/common/http";
import {Utente} from "../../model/utente.model";
import { TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginTitle: string;
  loginSubTitle: string;
  account: Account = { username:"dedo@gmail.com", password:"pippo" };

  constructor(public navCtrl: NavController, public navParams: NavParams, public utenteService: UtenteService,public events: Events,  public alertCtrl: AlertController, public translateService: TranslateService) {
  }

  login(){
    console.log("Account : "+this.account);
      this.utenteService.login(this.account)
        .subscribe((utente: Utente) => {
            this.events.publish('login', utente);
          },
          (err: HttpErrorResponse) => {
            if (err.status == 401) {
              console.error('login request error: ' + err.status);
              this.showLoginError();
            }
          });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log('ionViewDidLoad LoginPage');
    this.translateService.get('LOGIN_ERROR_SUB_TITLE').subscribe((data) => {
      this.loginSubTitle = data;
    });
    this.translateService.get('LOGIN_ERROR_TITLE').subscribe((data) => {
      this.loginTitle = data;
    });
  }

  goRegister(){
    this.navCtrl.push(RegistrazionePage);
  }

  goRecupera(){
    this.navCtrl.push(RecuperaPswPage);
  }

  stampa(){
    this.utenteService.stamp();
  }

  showLoginError() {
    let alert = this.alertCtrl.create({
      title: this.loginTitle,
      subTitle: this.loginSubTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
