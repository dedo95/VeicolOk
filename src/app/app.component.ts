import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { ContattaciPage } from '../pages/contattaci/contattaci';
import { ChiSiamoPage } from '../pages/chi-siamo/chi-siamo';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any=LoginPage;
  pages: Array<{ title: string, component: any }>;
  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public menu: MenuController) {
  /*platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }*/
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Contattaci', component: ContattaciPage },
      { title: 'Chi Siamo' , component: ChiSiamoPage},
      { title: 'login', component: LoginPage}
     /* { title: 'My First List', component: ListPage },
      { title: 'My Page', component: MyPage }
    */];
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
}
