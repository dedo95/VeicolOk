import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { VeicoloService } from '../../services/veicolo.service';
import { Storage } from '@ionic/storage';
import { UtenteService } from '../../services/utente.service';
import {TabsPage} from "../tabs/tabs";
import {Veicolo} from "../../model/veicolo.model";
import {Camera} from "@ionic-native/camera";
import {FileTransfer} from "@ionic-native/file-transfer";
/**
 * Generated class for the AggiungiveicoloPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aggiungiveicolo',
  templateUrl: 'aggiungiveicolo.html',
})
export class AggiungiveicoloPage {

  veicolo :Veicolo=new Veicolo();
  image:string="";

  constructor(public navCtrl: NavController,
              public veicoloService: VeicoloService,
              public storage: Storage,
              public camera:Camera,
              public fileTransfer: FileTransfer) {

  }

  creaVeicolo(veicoloForm: NgForm) {
    this.veicolo.targa = veicoloForm.value.targa;
    this.veicolo.alimentazione = veicoloForm.value.alimentazione;
    this.veicolo.anno_immatricolazione = veicoloForm.value.anno_immatricolazione;
    this.veicolo.cavalli = veicoloForm.value.cavalli;
    this.veicolo.cilindrata = veicoloForm.value.cilindrata;
    this.veicolo.colore = veicoloForm.value.colore;
    this.veicolo.descrizione = veicoloForm.value.descrizione;
    this.veicolo.img = "";
    this.veicolo.kw = veicoloForm.value.kw;
    this.veicolo.tipologia = veicoloForm.value.tipologia;
    this.veicoloService.create(this.veicolo);
    this.navCtrl.push(TabsPage);
  }
}
