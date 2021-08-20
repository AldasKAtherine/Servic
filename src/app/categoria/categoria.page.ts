import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//fire
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Servicio } from '../servicio';
import { Categoria } from '../categoria';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  arg=null;
  datos:any;
  cateSel:any;
  private itemsCollection: AngularFirestoreCollection<Servicio>;
  items: Observable<Servicio[]>;
  servicios: Servicio[] = [];
  private itemDoc: AngularFirestoreDocument<Categoria>;
  item: Observable<Categoria>;

  
  constructor( private activateRoute:ActivatedRoute,private db: AngularFirestore, private afAuth:AngularFireAuth) { 
   
  }

  ngOnInit() {
    this.arg=this.activateRoute.snapshot .paramMap.get('cat'); 
    
    this.itemsCollection = this.db.collection<Servicio>('servicios',ref=>ref.where('categoria.id','==',this.arg));
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Servicio;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    
    this.itemDoc=this.db.doc('categorias/'+this.arg);
    this.item = this.itemDoc.valueChanges();
    console.log(this.item);
  }

 // leer_dato(){
 //   fetch('./assets/categoria.json').then(res=>res.json())
 //   .then(json=>{
 //     this.datos=json;
 //     console.log(this.datos);
 //      this.cateSel = this.datos.filter(dato => dato.categoria == this.arg);
 //   })
//
 //   console.log("cateSel===>"+this.cateSel);
 // }

}
