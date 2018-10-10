import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamigliaPage } from './famiglia';

@NgModule({
  declarations: [
    FamigliaPage,
  ],
  imports: [
    IonicPageModule.forChild(FamigliaPage),
  ],
})
export class FamigliaPageModule {}
