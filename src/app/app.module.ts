import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ContattaciPage,
    ProfiloPage,
    ChiSiamoPage,
    LoginPage,
    RegistrazionePage,
    RecuperaPswPage,
    AggiungiveicoloPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ContattaciPage, 
    ProfiloPage,
    ChiSiamoPage,
    LoginPage,
    RegistrazionePage,
    RecuperaPswPage,
    AggiungiveicoloPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
