import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';


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
import { LinguaService } from '../services/lingua.service';



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
    AggiungiMembroPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    }),
    IonicStorageModule.forRoot({
      name: 'myunivaq__db',
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
    AggiungiMembroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LinguaService
  ]
})
export class AppModule {}
