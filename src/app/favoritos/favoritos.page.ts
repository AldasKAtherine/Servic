import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Servicio } from '../servicio';
import { Observable } from 'rxjs';
export interface Favoritos{servicios_favoritos: Servicio[]; }
@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  private documento: AngularFirestoreDocument<Favoritos>;
  favoritos: Observable<Favoritos>;
  constructor(private fFirestore: AngularFirestore,private afAuth: AngularFireAuth) {
    var user  = this.afAuth.auth.currentUser.uid;
    console.log(user);
    this.documento = fFirestore.doc<Favoritos>('favoritos/'+user);
    this.favoritos =this.documento.valueChanges();
   }
  ngOnInit() {
  }
  desmarcar(idServicio){
    this.documento.get().toPromise().then(doc =>{
      let favoritos =  doc.data();
      let nuevosFav =  [];
      favoritos.servicios_favoritos.forEach(fav => {
        if(fav.id_servicio !== idServicio){
            nuevosFav.push(fav);
        }
      });
      this.documento.update({servicios_favoritos:nuevosFav});
    }); 
  }
}
