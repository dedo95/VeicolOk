import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController,Platform, Refresher } from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path/ngx';
import {Transfer} from "@ionic-native/transfer";
import { File } from '@ionic-native/file/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from "@angular/common/http";

import {VeicoloService} from "../../services/veicolo.service";
import {Utente} from "../../model/utente.model";
import {Veicolo} from "../../model/veicolo.model";
import {ScadenzaPage} from "../scadenza/scadenza";
import { ListainterventiPage } from '../listainterventi/listainterventi';

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-info-veicolo',
  templateUrl: 'info-veicolo.html',
})
export class InfoVeicoloPage {

  veicolo :Veicolo=new Veicolo();
  image: String="";
  tipologia:string='';
  scadenze: Array<{title: string, component: any}>;
  utente:Utente=new Utente();
  targa:string='';

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
    this.scadenze = [
      {title: 'Assicurazione', component: ScadenzaPage},
      {title: 'Bollo', component: ScadenzaPage},
      {title: 'Revisione', component: ScadenzaPage},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoVeicoloPage');
    this.veicolo=this.navParams.data;
    this.targa=this.veicolo.targa;
    this.tipologia=this.veicolo.tipologia;
    this.utente=this.veicolo.utente;
    if (this.veicolo.img.length ===0) {
      this.veicolo.img = "../../assets/imgs/default.png";
    }
  }

  onSubmit(){
      this.veicolo.img='';
      this.veicoloService.updateVeicolo(this.veicolo).subscribe((nuovoVeicolo: Veicolo) => {
        this.veicolo = nuovoVeicolo;
        if (this.veicolo.img.length===0){
          this.veicolo.img="../../assets/imgs/default.png";
        }
      });
  }

  openPage(scadenza) {
    this.navCtrl.push(scadenza.component,{scadenza:scadenza.title,targa:this.targa});
  }

  openInterventi(){
    this.navCtrl.push(ListainterventiPage,this.targa);
  }

  doRefresh(refresher: Refresher){
    refresher.complete();
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
      quality: 100,
      targetWidth: 200,
      targetHeight: 150,
      sourceType: sourceType,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageURI) => {
      let base64Image = "data:image/jpeg;base64,"+ imageURI;
      this.veicolo.img=base64Image;
      this.veicoloService.updateImage(this.veicolo);
    }, (err) => {
      console.log(err)
    });
  }

}
