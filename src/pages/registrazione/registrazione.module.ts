import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrazionePage } from './registrazione';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';


@NgModule({
  declarations: [
    RegistrazionePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrazionePage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
})
export class RegistrazionePageModule {}
