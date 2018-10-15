import { Component,ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
@Component({
  selector: 'page-contattaci',
  templateUrl: 'contattaci.html',
})
export class ContattaciPage {
  constructor(public navCtrl: NavController) {
  }
}
