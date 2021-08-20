import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltrarPageRoutingModule } from './filtrar-routing.module';

import { FiltrarPage } from './filtrar.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltrarPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FiltrarPage]
})
export class FiltrarPageModule {}
