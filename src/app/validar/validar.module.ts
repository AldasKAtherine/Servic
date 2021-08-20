import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidarPageRoutingModule } from './validar-routing.module';

import { ValidarPage } from './validar.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ValidarPage]
})
export class ValidarPageModule {}
