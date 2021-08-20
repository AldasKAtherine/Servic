import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoServicioPage } from './nuevo-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoServicioPageRoutingModule {}
