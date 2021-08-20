import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratadoPageRoutingModule } from './contratado-routing.module';

import { ContratadoPage } from './contratado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratadoPageRoutingModule
  ],
  declarations: [ContratadoPage]
})
export class ContratadoPageModule {}
