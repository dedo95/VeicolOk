import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContattaciPage } from './contattaci';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';

@NgModule({
  declarations: [
    ContattaciPage,
  ],
  imports: [
    IonicPageModule.forChild(ContattaciPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
  exports: [
    ContattaciPage
  ]
})
export class ContattaciPageModule {}
