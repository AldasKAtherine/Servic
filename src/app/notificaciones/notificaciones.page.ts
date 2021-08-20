import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../usuario';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
export interface Notificaciones{cancelada: boolean, 
  fecha_contacto: Date, 
  nombre_servicio: string,
  usuario_contrata: Usuario,
  usuario_contratado: Usuario
}
@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  //los servicios que el usuario ha contratado
  //mensaje --> usted ha contratado
  pestana_activa="noti1";
  servicios_requeridos: Observable<Notificaciones[]>;
  ////notificaciones cuando otro usuario contrata un servicio suyo
  contratos_serOfer: Observable<Notificaciones[]>;
  constructor(private fAuth: AngularFireAuth, private fFirestore: AngularFirestore ) {
    var user  = this.fAuth.auth.currentUser.uid;
    console.log(user);
    //
    this.servicios_requeridos = fFirestore.collection<Notificaciones>('contrataciones',
    ref => ref.where('usuario_contrata.id','==',user)).valueChanges({ idField: 'eventId' });
    //console.log(this.servicios_requeridos);
    this.contratos_serOfer = fFirestore.collection<Notificaciones>('contrataciones',
    refe => refe.where('usuario_contratado.id','==',user)).valueChanges({ idField: 'eventId' });
   }
   segmentChanged(ev: any) {
    //console.log('Cambio', ev);
    this.pestana_activa = ev.detail.value;
    //console.log(this.pestana_activa)
  }
  ngOnInit() {
  }
}
