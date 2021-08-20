import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
//Firebas
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore , AngularFirestoreCollection} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Categoria } from '../categoria';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})

export class CategoriasPage implements OnInit {
@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  //data:any[]=["Agricultor","Carpintería"];
  //data:any;
  valor:string;
 
  //Produccion
 
  private itemsCollection: AngularFirestoreCollection<Categoria>;
  items: Observable<Categoria[]>;
  
  constructor(public navControl: NavController,private afAuth:AngularFireAuth, private db:AngularFirestore) { 
    
    
  }

  addItem(item: Categoria) {
    this.itemsCollection.add(item);
  }
  ngOnInit() {
   
    //this.leer_dato();
    this.itemsCollection = this.db.collection<Categoria>('categorias');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Categoria;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    console.log(this.items);
  }

  //leer_dato(){
  //  fetch('./assets/datos.json').then(res=>res.json())
  //  .then(json=>{
  //    this.data=json;
  //   // console.log(this.data);
  //  })
  //}
  

  public Parametro(v){
    this.valor = v;
    //this.valor= b.getAttribute("value");
    console.log('valor es:',this.valor);
   
  }
  async Usuario(){
    //Usuario anonimo
    let usua = await this.afAuth.auth.currentUser;
  }
}


