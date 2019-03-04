import './shared/rxjs-operators';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { File } from '@ionic-native/file/ngx';
import { Transfer } from '@ionic-native/transfer/';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera';


import { UtenteService } from '../services/utente.service';
import { VeicoloService } from '../services/veicolo.service';
import { LinguaService } from '../services/lingua.service';
import {httpInterceptorProviders} from "../interceptors";

import { MyApp } from './app.component';
import { PatentePage } from '../pages/patente/patente';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ContattaciPage } from '../pages/contattaci/contattaci';
import { ProfiloPage } from '../pages/profilo/profilo';
import { ChiSiamoPage } from '../pages/chi-siamo/chi-siamo';
import { LoginPage } from '../pages/login/login';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import { RecuperaPswPage } from '../pages/recupera-psw/recupera-psw';
import { AggiungiveicoloPage } from '../pages/aggiungiveicolo/aggiungiveicolo';
import { FamigliaPage} from '../pages/famiglia/famiglia';
import { AggiungiMembroPage} from '../pages/aggiungi-membro/aggiungi-membro';
import {TokenInterceptor} from "../interceptors/token.interceptor";
import {InfoVeicoloPage} from "../pages/info-veicolo/info-veicolo";
import {PatenteService} from "../services/patente.service";
import {FamigliaService} from "../services/famiglia.service";
import {ScadenzaPage} from "../pages/scadenza/scadenza";
import {ScadenzaService} from "../services/scadenza.service";
import {FamigliarePage} from "../pages/famigliare/famigliare";





export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    PatentePage,
    HomePage,
    TabsPage,
    ContattaciPage,
    ProfiloPage,
    ChiSiamoPage,
    LoginPage,
    RegistrazionePage,
    RecuperaPswPage,
    AggiungiveicoloPage,
    FamigliaPage,
    AggiungiMembroPage,
    InfoVeicoloPage,
    ScadenzaPage,
    FamigliarePage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    }),
    IonicStorageModule.forRoot({
      name: 'vok__db',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PatentePage,
    HomePage,
    TabsPage,
    ContattaciPage,
    ProfiloPage,
    ChiSiamoPage,
    LoginPage,
    RegistrazionePage,
    RecuperaPswPage,
    AggiungiveicoloPage,
    FamigliaPage,
    AggiungiMembroPage,
    InfoVeicoloPage,
    ScadenzaPage,
    FamigliarePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LinguaService,
    UtenteService,
    VeicoloService,
    PatenteService,
    FamigliaService,
    ScadenzaService,
    httpInterceptorProviders,
    Camera,
    FilePath,
    Transfer,
    File
  ]
})
export class AppModule {}
