import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoVeicoloPage } from './info-veicolo';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';

@NgModule({
  declarations: [
    InfoVeicoloPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoVeicoloPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
})
export class InfoVeicoloPageModule {}
