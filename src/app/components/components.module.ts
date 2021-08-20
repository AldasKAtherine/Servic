import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TarjetaServicioComponent } from './tarjeta-servicio/tarjeta-servicio.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { BotonComponent } from './boton/boton.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [CommonModule],
    declarations: [TarjetaServicioComponent, CalificacionComponent, BotonComponent],
    exports: [TarjetaServicioComponent, CalificacionComponent, BotonComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule { }