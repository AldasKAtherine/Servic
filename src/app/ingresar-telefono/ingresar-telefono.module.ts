import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarTelefonoPageRoutingModule } from './ingresar-telefono-routing.module';

import { IngresarTelefonoPage } from './ingresar-telefono.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarTelefonoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [IngresarTelefonoPage]
})
export class IngresarTelefonoPageModule {}
