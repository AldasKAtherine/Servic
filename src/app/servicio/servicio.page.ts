import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Servicio } from '../servicio';
import { Usuario } from '../usuario';
import * as firebase from 'firebase';

export interface Favoritos { servicios_favoritos: Servicio[]; }


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})

export class ServicioPage implements OnInit {
  showToolbar = false;
  opacity = 0;
  idServicio = '';
  idUsuario;


  ser: Servicio;

  private documento: AngularFirestoreDocument<Servicio>;
  servicio: Observable<Servicio>;

  private documentoU: AngularFirestoreDocument<Usuario>;
  usuario: Observable<Usuario>;

  private documentoFavoritos: AngularFirestoreDocument<Favoritos>;
  favoritos: Observable<Favoritos>;

  onScroll($event) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 170;
      this.opacity = (scrollTop / 225);
      console.log(this.opacity);
    }
  }

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private _Activatedroute: ActivatedRoute, private router: Router) {
    this.idServicio = this._Activatedroute.snapshot.paramMap.get("id");
    this.documento = afs.doc<Servicio>(`servicios/${this.idServicio}`);
    this.servicio = this.documento.valueChanges();

    this.afAuth.authState.subscribe((i) => {
      this.idUsuario = i.uid;
      this.documento.get().toPromise().then((s) => {
        this.ser = s.data() as Servicio;
        this.documentoU = afs.doc<Usuario>(`usuarios/${this.ser.usuario_id}`);
        this.usuario = this.documentoU.valueChanges();
      });

      this.documentoFavoritos = afs.doc<Favoritos>(`favoritos/${this.idUsuario}`);
      this.favoritos = this.documentoFavoritos.valueChanges();
    });
  }

  ngOnInit() {
  }
  esFavorito(favoritos) {
    if (favoritos == null) return false;
    return favoritos.servicios_favoritos.some((f) => this.idServicio == f.id_servicio);
  }

  agregarFavorito() {
    console.log('agregarFavorito')
    this.documentoFavoritos.get().toPromise().then((s) => {
      let a;

      if (s.exists) {
        a = s.data()
      } else {
        a = { servicios_favoritos: [] }
      }


      a.servicios_favoritos.push({
        ...this.ser,
        id_servicio: this.idServicio
      });
      if(s.exists){
        this.documentoFavoritos.update(a);
      } else{
        this.documentoFavoritos.set(a);
      }
      console.log(a);
    });
  }

  eliminarFavorito() {
    console.log('eliminarFavorito')
    this.documentoFavoritos.get().toPromise().then((s) => {
      let a = s.data();
      a.servicios_favoritos = a.servicios_favoritos.filter((s) => s.id_servicio != this.idServicio)
      this.documentoFavoritos.update(a);
    });
  }


  contratarServicio() {
    this.afs.doc(`/usuarios/${this.idUsuario}`).get().toPromise().then((usu) => {
      let usuario = usu.data();
      console.log({usuario});
      this.afs.doc(`/usuarios/${this.ser.usuario_id}`).get().toPromise().then((usu2) => {
        
        let usuario2 = usu2.data();
        let contratacion = {
          calificacion: null,
          cancelada: false,
          comentario: "",
          fecha_contacto: firebase.firestore.Timestamp.fromDate(new Date()),
          fecha_fin: null,
          nombre_servicio: this.ser.titulo,
          servicio_id: this.idServicio,
          usuario_contrata: usuario,
          usuario_contratado: usuario2
        };

        this.afs.collection('/contrataciones').add(contratacion).then((s) => {
          return s.get();
        }).then((snap) => {
          this.router.navigate(['/contratado', usuario2.nombre, this.ser.titulo, usuario2.imagen_perfil, usuario2.numero_telefono, snap.id])  
        });
      })
    });
  }


}
