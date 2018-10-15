import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ProfiloPage } from '../profilo/profilo';
import { FamigliaPage } from '../famiglia/famiglia';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = FamigliaPage;
  tab4Root = ProfiloPage;
  constructor() {

  }
}
