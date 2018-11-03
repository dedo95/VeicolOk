import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChiSiamoPage } from './chi-siamo';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';


@NgModule({
  declarations: [
    ChiSiamoPage,
  ],
  imports: [
    IonicPageModule.forChild(ChiSiamoPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
})
export class ChiSiamoPageModule {}
