import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../usuario';
import {Location} from '@angular/common';

interface Contratacion {
  calificacion: number;
  cancelada: boolean;
  comentario: string;
  fecha_contacto: Date;
  fecha_fin: Date;
  nombre_servicio: string;
  servicio_id: string;
  usuario_contrata: Usuario;
  usuario_contratado: Usuario;
};

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.page.html',
  styleUrls: ['./calificar.page.scss'],
})
export class CalificarPage implements OnInit {

  idContratacion;

  calificacion;
  comentario;


  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore, private _Activatedroute: ActivatedRoute, private location: Location) { 
    this.idContratacion = this._Activatedroute.snapshot.paramMap.get("id");
  }


  callback(num){
    this.calificacion = num;
  }

  textoCambio(texto){
    this.comentario = texto.detail.value;
    console.log(texto.detail.value);
  }

  enviarCalificacion() {
    this.afFirestore.doc<Contratacion>(`contrataciones/${this.idContratacion}`).update({
      'calificacion': this.calificacion,
      'comentario': this.comentario
    }).then(() =>{
      this.location.back();
    });
    

  }

  ngOnInit() {
  }

}
