import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from 'src/app/servicio';

@Component({
  selector: 'app-tarjeta-servicio',
  templateUrl: './tarjeta-servicio.component.html',
  styleUrls: ['./tarjeta-servicio.component.scss'],
})
export class TarjetaServicioComponent implements OnInit {

  @Input()
  servicio: Servicio;

  @Input()
  mostrarCategoria: boolean = true;

  constructor() {
    
  }

  ngOnInit() {


    console.log(this.servicio);
    console.log(this.mostrarCategoria);

  }

}
