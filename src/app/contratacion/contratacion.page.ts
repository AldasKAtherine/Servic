import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../usuario';
import { Observable } from 'rxjs';
import { Servicio } from '../servicio';


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
  selector: 'app-contratacion',
  templateUrl: './contratacion.page.html',
  styleUrls: ['./contratacion.page.scss'],
})

export class ContratacionPage implements OnInit {

  idContratacion = "";
  idUsuarioActual = "";


  private documentoContratacion: AngularFirestoreDocument<Contratacion>;
  public contrantacion: Observable<Contratacion>;

  private documentoServicio: AngularFirestoreDocument<Servicio>;
  servicio: Observable<Servicio>;

  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore, private _Activatedroute: ActivatedRoute) { 
    this.idContratacion = this._Activatedroute.snapshot.paramMap.get("id");
    
    this.afAuth.authState.subscribe((usu) => {
      this.idUsuarioActual = usu.uid;
      
      this.documentoContratacion = afFirestore.doc<Contratacion>(`contrataciones/${this.idContratacion}`);
      this.contrantacion = this.documentoContratacion.valueChanges();

      this.documentoContratacion.get().toPromise().then((s) =>{

        let servicioId = s.data().servicio_id;
        this.documentoServicio = afFirestore.doc<Servicio>(`servicios/${servicioId}`);
        this.servicio = this.documentoServicio.valueChanges();
      });


    });

  }


  cancelarContrato(){
    this.documentoContratacion.update({
      cancelada: true,
      'fecha_fin': new Date()
    });
  }

  marcarFinalizada(){
    this.documentoContratacion.update({
      'fecha_fin': new Date()
    });
  }

  ngOnInit() {
  }

}
