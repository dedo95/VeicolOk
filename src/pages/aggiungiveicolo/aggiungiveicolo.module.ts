import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AggiungiveicoloPage } from './aggiungiveicolo';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';


@NgModule({
  declarations: [
    AggiungiveicoloPage,
  ],
  imports: [
    IonicPageModule.forChild(AggiungiveicoloPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
})
export class AggiungiveicoloPageModule {}
