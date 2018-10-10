import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AggiungiMembroPage } from './aggiungi-membro';

@NgModule({
  declarations: [
    AggiungiMembroPage,
  ],
  imports: [
    IonicPageModule.forChild(AggiungiMembroPage),
  ],
})
export class AggiungiMembroPageModule {}
