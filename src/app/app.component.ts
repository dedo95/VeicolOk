import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Platform, MenuController, Nav, Events, AlertController, NavController} from 'ionic-angular';
import { LinguaService,Lingua } from '../services/lingua.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { UTENTE_STORAGE } from '../constants';


//Pages
import { ContattaciPage } from '../pages/contattaci/contattaci';
import { ChiSiamoPage } from '../pages/chi-siamo/chi-siamo';
import { LoginPage } from '../pages/login/login';
import {Utente} from "../model/utente.model";
import {TabsPage} from "../pages/tabs/tabs";
import {UtenteService} from "../services/utente.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProfiloPage} from "../pages/profilo/profilo";
import {DomSanitizer} from "@angular/platform-browser";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  linguaPreferita: string;
  lingue: Array<Lingua>;
  rootPage: any ;
  pages: Array<{ title: string, component: any, icon: string }>;
  @ViewChild(Nav) nav: Nav;
  lang: string='italiano';
  utente: Utente;
  isLogged:boolean;
  image:boolean;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController,
              private linguaService: LinguaService,
              private translate: TranslateService,
              public storage: Storage,
              public events: Events,
              private utenteService: UtenteService,
              public alertCtrl: AlertController,
              private _DomSanitizationService: DomSanitizer){

    this.initTranslate();
    this.subscribeToEvents();
    this.platform.ready().then(() => {
      this.utenteService.getUtente().subscribe((utente: Utente) => {
        if (utente != null) {
          this.utente = utente;
          this.rootPage = TabsPage;
          this.isLogged=true;
          if (this.utente.img.length===0){
            this.image=true;
          }
        } else {
          this.rootPage = LoginPage;
        }
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.pages = [
      {title: 'CONTATTACI', component: ContattaciPage, icon: "ios-chatbubbles-outline"},
      {title: 'CHI_SIAMO', component: ChiSiamoPage, icon: "ios-information-circle-outline"},
    ];
  }

  initTranslate() {
    let linguaPreferita = this.linguaService.getLinguaPreferita();
    this.translate.setDefaultLang(linguaPreferita);
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      if (lingua != null) {
        this.translate.use(lingua);
      } else {
        this.translate.use(linguaPreferita);
        this.linguaService.updateLingua(linguaPreferita);
      }
      if (lingua === 'it') {
        this.lang = "italiano";
      } else {
        this.lang = "inglese";
      }
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.push(page.component);
  }

  click_on(value) {
    this.translate.use(value);
    this.linguaService.updateLingua(value);
  }

  logout() {
    this.menu.close();
    this.utenteService.logout();
    this.isLogged=false;
    this.nav.setRoot(LoginPage);
  }

  subscribeToEvents() {
    this.events.subscribe('login', (utente: Utente) => {
      this.utente = utente;
      this.nav.setRoot(TabsPage);
      this.isLogged=true;
    });
    this.events.subscribe('server-error', (err: HttpErrorResponse) => {
      this.showMessageServerError(err);
    });
  }

  showMessageServerError(err: HttpErrorResponse) {
    let errorMessage = "Errore nel server";

    switch (err.status) {
      case 403:
        errorMessage = "Utente non autorizzato";
        break;
      case 401:
        errorMessage = "Utente non autenticato";
        break;
      default:
        errorMessage = `Errore: ${err.status}`;
    }
    let alert = this.alertCtrl.create({
      title: "Errore",
      subTitle: errorMessage,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.logout();
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  goToProfilo(){
    this.menu.close();
    this.nav.push(ProfiloPage);
  }

}
