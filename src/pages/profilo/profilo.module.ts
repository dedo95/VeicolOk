import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiloPage } from './profilo';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';


@NgModule({
  declarations: [
    ProfiloPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiloPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
})
export class ProfiloPageModule {}
