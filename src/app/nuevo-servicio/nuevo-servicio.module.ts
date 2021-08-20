import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoServicioPageRoutingModule } from './nuevo-servicio-routing.module';

import { NuevoServicioPage } from './nuevo-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoServicioPageRoutingModule
  ],
  declarations: [NuevoServicioPage]
})
export class NuevoServicioPageModule {}
