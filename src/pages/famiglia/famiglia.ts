import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AggiungiMembroPage } from '../aggiungi-membro/aggiungi-membro';

@IonicPage()
@Component({
  selector: 'page-famiglia',
  templateUrl: 'famiglia.html',
})
export class FamigliaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertController:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FamigliaPage');
  }


  goAggiungi_Membro(){
    this.navCtrl.push(AggiungiMembroPage);
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      title:'Crea Famiglia',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
