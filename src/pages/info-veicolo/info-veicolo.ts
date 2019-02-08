import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,Platform, Refresher } from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path/ngx';
import {Transfer} from "@ionic-native/transfer";
import { File } from '@ionic-native/file/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from "@angular/common/http";
import {UtenteService} from "../../services/utente.service";
import {VeicoloService} from "../../services/veicolo.service";

/**
 * Generated class for the InfoVeicoloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-info-veicolo',
  templateUrl: 'info-veicolo.html',
})
export class InfoVeicoloPage {

  veicolo = {
    targa: '',
    alimentazione: '',
    anno_immatricolazione: '',
    cavalli: '',
    cilindrata: '',
    colore: '',
    descrizione: '',
    img:'',
    kw: '',
    tipologia: '',
    utente: {}
  };
  image: String="";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public platform: Platform,
              public http: HttpClient,
              private _DomSanitizationService: DomSanitizer,
              private veicoloService:VeicoloService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoVeicoloPage');
    this.veicolo=this.navParams.data;
    console.log(this.veicolo);
    if (this.veicolo.img.length ===0) {
      console.log("VEROOOOO");
      this.veicolo.img = "../../assets/imgs/default.png";
      console.log(this._DomSanitizationService.bypassSecurityTrustUrl(this.veicolo.img));
    }
  }

  modifica() {
    console.log("INIZIO CAMERA");
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 50,
      targetWidth: 400,
      targetHeight: 400,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      // In this app, dynamically set the picture source, Camera or photo gallery
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imageURI) => {
      console.log("RRRRRRRRRRRRRRRRRRr");
      let base64Image = "data:image/jpeg;base64,"+ imageURI;
      console.log(base64Image);
      this.veicolo.img=base64Image;
      console.log(this.veicolo);
      this.veicoloService.updateImage(this.veicolo);
    }, (err) => {
      console.log(err)
    });

  }

  doRefresh(refresher: Refresher){

      refresher.complete();

  }

}
