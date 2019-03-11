import { Component } from '@angular/core';
import {
  ActionSheetController,
  IonicPage, Loading,
  NavController,
  NavParams,
  Platform, Refresher
} from 'ionic-angular';
import {UtenteService} from "../../services/utente.service";
import {Utente} from "../../model/utente.model";
import {Camera} from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path/ngx';
import {Transfer} from "@ionic-native/transfer";
import { File } from '@ionic-native/file/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";

declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-profilo',
  templateUrl: 'profilo.html',
})
export class ProfiloPage {

  utente: Utente = new Utente();
  image: string = "";
  loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utenteService: UtenteService,
              public actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private transfer: Transfer,
              private file: File,
              private filePath: FilePath,
              public platform: Platform,
              public http: HttpClient,
              private _DomSanitizationService: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiloPage');
    this.utenteService.getUtente().subscribe((user) => {
      this.utente = user;
      if (this.utente.img.length ===0) {
        this.utente.img = "../../assets/imgs/user.png";
      }
    });
  }

  onSubmit(profileForm: NgForm){
    if (profileForm.valid){
      this.image=this.utente.img;
      this.utente.img='';
      this.utenteService.updateProfilo(this.utente).subscribe((nuovoUtente: Utente) => {
        this.utente = nuovoUtente;
        this.utente.img=this.image;
      });
    }
  }

  modifica() {
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
    var options = {
      quality: 90,
      targetWidth: 80,
      targetHeight: 80,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageURI) => {
      let base64Image = "data:image/jpeg;base64,"+ imageURI;
      this.utenteService.updateImage(base64Image);
    }, (err) => {
      console.log(err)
    });
  }

  doRefresh(refresher: Refresher){
    this.utenteService.getUtente().subscribe((user) => {
      this.utente = user;
      if (this.utente.img.length ===0) {
        this.utente.img = "../../assets/imgs/user.png";
      }
      refresher.complete();
    });
  }

}

