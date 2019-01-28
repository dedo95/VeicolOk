import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import {UtenteService} from "../../services/utente.service";
import {Utente} from "../../model/utente.model";

/**
 * Generated class for the ProfiloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {

  utente:Utente=new Utente();

  image: String="";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utenteService: UtenteService,
              public camera: Camera,
              public fileTransfer: FileTransfer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPage');
    this.utenteService.getUtente().subscribe((user)=>{
      this.utente=user;
      console.log(this.utente);
    })
  }

  modifica() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.image = 'data:image/jpeg;base64,'+imageData;
  });
  }
}
