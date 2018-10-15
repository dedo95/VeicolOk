import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ContattaciPage } from '../pages/contattaci/contattaci';
import { ProfiloPage } from '../pages/profilo/profilo';
import { ChiSiamoPage } from '../pages/chi-siamo/chi-siamo';
import { LoginPage } from '../pages/login/login';
import { RegistrazionePage } from '../pages/registrazione/registrazione';
import { RecuperaPswPage } from '../pages/recupera-psw/recupera-psw';
import { AggiungiveicoloPage } from '../pages/aggiungiveicolo/aggiungiveicolo';
import { FamigliaPage} from '../pages/famiglia/famiglia';
import { AggiungiMembroPage} from '../pages/aggiungi-membro/aggiungi-membro';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
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
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
