import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contratado',
  templateUrl: './contratado.page.html',
  styleUrls: ['./contratado.page.scss'],
})
export class ContratadoPage implements OnInit {

  nombreUsuario;
  nombreServicio;
  usuarioFoto;
  telefono;
  idContratacion;

  constructor(private _Activatedroute:ActivatedRoute) { 
    this.nombreUsuario = this._Activatedroute.snapshot.paramMap.get("nombreUsuario");
    this.nombreServicio = this._Activatedroute.snapshot.paramMap.get("nombreServicio");
    this.usuarioFoto = this._Activatedroute.snapshot.paramMap.get("usuarioFoto");
    this.telefono = this._Activatedroute.snapshot.paramMap.get("telefono");
    this.idContratacion = this._Activatedroute.snapshot.paramMap.get("id");
  }


  ngOnInit() {
  }

}
