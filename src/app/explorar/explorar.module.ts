import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorarPageRoutingModule } from './explorar-routing.module';
import { ExplorarPage } from './explorar.page';
import { ComponentsModule } from '../components/components.module';

// Algolia
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorarPageRoutingModule,
    ComponentsModule,
    NgAisModule.forRoot(),
  ],
  declarations: [ExplorarPage]
})
export class ExplorarPageModule {}
