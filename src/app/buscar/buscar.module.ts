import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarPageRoutingModule } from './buscar-routing.module';

import { BuscarPage } from './buscar.page';
// Algolia
import { NgAisModule } from 'angular-instantsearch';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarPageRoutingModule,
    NgAisModule.forRoot(),
    ComponentsModule
  ],
  declarations: [BuscarPage]
})
export class BuscarPageModule {}
