import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamigliarePage } from './famigliare';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';


@NgModule({
  declarations: [
    FamigliarePage,
  ],
  imports: [
    IonicPageModule.forChild(FamigliarePage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
})
export class FamigliarePageModule {}
