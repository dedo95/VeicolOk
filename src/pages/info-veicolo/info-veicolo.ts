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
import {NgForm} from "@angular/forms";
import {Utente} from "../../model/utente.model";
import {Veicolo} from "../../model/veicolo.model";
import {ContattaciPage} from "../contattaci/contattaci";
import {ChiSiamoPage} from "../chi-siamo/chi-siamo";
import {ScadenzaPage} from "../scadenza/scadenza";

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
    console.log(this.veicolo);
    if (this.veicolo.img.length ===0) {
      console.log("VEROOOOO");
      this.veicolo.img = "../../assets/imgs/default.png";
      //console.log(this._DomSanitizationService.bypassSecurityTrustUrl(this.veicolo.img));
    }
  }



  onSubmit(veicoloForm: NgForm){
   // if (veicoloForm.valid){
      this.veicolo.img='';
      this.veicoloService.updateVeicolo(this.veicolo).subscribe((nuovoVeicolo: Veicolo) => {
        this.veicolo = nuovoVeicolo;
        if (this.veicolo.img.length===0){
          this.veicolo.img="../../assets/imgs/default.png";
        }
      });
    //}
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

  openPage(scadenza) {
    this.navCtrl.push(scadenza.component,{scadenza:scadenza.title,targa:this.targa});
  }

}
