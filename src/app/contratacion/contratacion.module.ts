import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratacionPageRoutingModule } from './contratacion-routing.module';

import { ContratacionPage } from './contratacion.page';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratacionPageRoutingModule,
    MomentModule
  ],
  declarations: [ContratacionPage]
})
export class ContratacionPageModule {}
