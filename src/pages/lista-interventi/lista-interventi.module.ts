import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaInterventiPage } from './lista-interventi';

@NgModule({
  declarations: [
    ListaInterventiPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaInterventiPage),
  ],
})
export class ListaInterventiPageModule {}
