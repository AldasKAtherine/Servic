import { Component, OnInit } from '@angular/core';
import { Servicio } from '../servicio';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Categoria } from '../categoria';

// Algolia
import * as algoliasearch from 'algoliasearch/lite';
import { map } from 'rxjs/operators';

const searchClient = algoliasearch(
  'T229HYMY48',
  'b6d674233693d77c433f0ac7c0090bf5'
);

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.page.html',
  styleUrls: ['./explorar.page.scss'],
})
export class ExplorarPage implements OnInit {

  configExplorar = {
    indexName: 'servicios',
    searchClient,
  };

  searchParameters = {
    aroundLatLng: '40.71, -74.01',
    aroundRadius: 4000,
    hitsPerPage: 30
  }

  servicios: Servicio[] = [];




  private coleccionCategorias: AngularFirestoreCollection<Categoria>;
  categorias: Observable<Categoria[]>;



  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore, private geolocation: Geolocation) {
  
    this.geolocation.getCurrentPosition().then((resp) => {
      this.searchParameters.aroundLatLng = resp.coords.latitude + ',' + resp.coords.longitude;
      console.log(this.searchParameters.aroundLatLng)
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    this.coleccionCategorias = afFirestore.collection<Categoria>('categorias', ref => ref.limit(3));
    this.categorias = this.coleccionCategorias.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Categoria;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );


  }


  getMinMaxPoints(latitude: number, longitude: number, distance: number) {

    distance = 0.621371 * distance;

    let lat = 0.0144927536231884;
    let lon = 0.0181818181818182;

    let lowerLat = latitude - (lat * distance)
    let lowerLon = longitude - (lon * distance)

    let greaterLat = latitude + (lat * distance)
    let greaterLon = longitude + (lon * distance)

    let lesserGeopoint = new firebase.firestore.GeoPoint(lowerLat, lowerLon)
    let greaterGeopoint = new firebase.firestore.GeoPoint(greaterLat, greaterLon)

    return {
      lesserGeopoint,
      greaterGeopoint
    }
  }


  ngOnInit() {

  }

}
