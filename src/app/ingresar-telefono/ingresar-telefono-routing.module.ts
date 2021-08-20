import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarTelefonoPage } from './ingresar-telefono.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarTelefonoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarTelefonoPageRoutingModule {}
