import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatentePage } from './patente';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../app/app.module';


@NgModule({
    declarations: [
        PatentePage,
    ],
    imports: [
        IonicPageModule.forChild(PatentePage),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]

            }
        })
    ],
})
export class PatentePageModule { }