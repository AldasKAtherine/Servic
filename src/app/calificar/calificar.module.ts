import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificarPageRoutingModule } from './calificar-routing.module';

import { CalificarPage } from './calificar.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CalificarPage]
})
export class CalificarPageModule {}
