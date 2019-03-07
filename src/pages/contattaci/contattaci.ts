import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-contattaci',
  templateUrl: 'contattaci.html',
})
export class ContattaciPage {
  constructor(public navCtrl: NavController, translate:TranslateService) {
  }
}
