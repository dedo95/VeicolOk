import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamigliaPage } from './famiglia';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';


@NgModule({
  declarations: [
    FamigliaPage,
  ],
  imports: [
    IonicPageModule.forChild(FamigliaPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
})
export class FamigliaPageModule {}
