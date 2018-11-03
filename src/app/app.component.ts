import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { LinguaService,Lingua } from '../services/lingua.service';
import { TranslateService } from '@ngx-translate/core';


//Pages
import { ContattaciPage } from '../pages/contattaci/contattaci';
import { ChiSiamoPage } from '../pages/chi-siamo/chi-siamo';
import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  linguaPreferita: string;
  lingue: Array<Lingua>;
  rootPage:any=LoginPage;
  pages: Array<{ title: string, component: any,icon:string }>;
  @ViewChild(Nav) nav: Nav;
  lang:string;

  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController,
              private linguaService: LinguaService,
              private translate: TranslateService
              ) {
    this.initTranslate();
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Contattaci', component: ContattaciPage, icon:"ios-chatbubbles-outline" },
      { title: 'Chi Siamo', component: ChiSiamoPage, icon:"ios-information-circle-outline"},
     ]; 
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    let linguaPreferita = this.linguaService.getLinguaPreferita();
    this.translate.setDefaultLang(linguaPreferita);
    this.linguaService.getLinguaAttuale().subscribe((lingua: string) => {
      if (lingua != null) {
        this.translate.use(lingua);
      } else {
        this.translate.use(linguaPreferita);
        this.linguaService.updateLingua(linguaPreferita);

      }
      if (lingua==='it') {
        this.lang="italiano";
      } else {
        this.lang="inglese";
      }
    })
  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.nav.push(page.component);
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
    
  }

  click_on(value){
    this.translate.use(value);
    this.linguaService.updateLingua(value);
  }
}
