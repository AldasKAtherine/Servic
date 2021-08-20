import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Usuario } from '../usuario';
import { Observable} from 'rxjs';
import { Servicio } from '../servicio';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  private documento: AngularFirestoreDocument<Usuario>;
  usuario: Observable<Usuario>;
  //obtencion de los servicios
  servicios: Observable<Servicio[]>;
  constructor(private fFirestore: AngularFirestore,private afAuth: AngularFireAuth, private router: Router) {
    var user  = this.afAuth.auth.currentUser.uid;
    console.log(user);
    this.documento = fFirestore.doc<Usuario>('usuarios/'+user);
    this.usuario =this.documento.valueChanges();
    ////
    this.servicios=fFirestore.collection<Servicio>('servicios',
    ref=>ref.where('usuario_id',"==",user)).valueChanges();
  }

  salir(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  ngOnInit() {
  }
}
