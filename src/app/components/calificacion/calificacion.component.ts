import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.scss'],
})
export class CalificacionComponent implements OnInit {

  @Output()
  callback = new EventEmitter<number>();

  numEstrellas = 0;

  setNumeroEstrellas(nu:number){
    this.numEstrellas = nu;
    if(this.callback) this.callback.emit(this.numEstrellas);
  }

  constructor() { }

  ngOnInit() {}

}
