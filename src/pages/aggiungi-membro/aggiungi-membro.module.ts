import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AggiungiMembroPage } from './aggiungi-membro';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';


@NgModule({
  declarations: [
    AggiungiMembroPage,
  ],
  imports: [
    IonicPageModule.forChild(AggiungiMembroPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]

      }
    })
  ],
})
export class AggiungiMembroPageModule {}
