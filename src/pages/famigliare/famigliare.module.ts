import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamigliarePage } from './famigliare';

@NgModule({
  declarations: [
    FamigliarePage,
  ],
  imports: [
    IonicPageModule.forChild(FamigliarePage),
  ],
})
export class FamigliarePageModule {}
