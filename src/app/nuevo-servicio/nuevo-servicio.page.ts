import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
//fire
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { map, finalize} from 'rxjs/operators';
import { Servicio } from '../servicio';
import { Categoria } from '../categoria';
import * as firebase from 'firebase/app'
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.page.html',
  styleUrls: ['./nuevo-servicio.page.scss'],
})
export class NuevoServicioPage implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Categoria>;
  items: Observable<Categoria[]>;
  constructor(public navCtrl: NavController, private camera:Camera,
    public actionSheetController: ActionSheetController,
    private db: AngularFirestore, 
    private afAuth:AngularFireAuth, 
    private storage:AngularFireStorage,
    public toastController: ToastController,
    private geolocation: Geolocation) { 

      this.geolocation.getCurrentPosition().then((resp) => {
       this.lat= resp.coords.latitude;
       this.long= resp.coords.longitude;
       console.log("Ubuicacion: " +this.lat+" "+this.long)
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    
  }

  @ViewChild('imageServURL') inputImageURL: ElementRef;
  //Variables
  lat:any;
  long:any;
  btnEnviar=true;
  regreso="/explorar";
  private itemDoc: AngularFirestoreDocument<Categoria>;
  item: Observable<Categoria>;
  icoFot='https://lh3.googleusercontent.com/proxy/wTXx2USr76JekXIdFQCV4XhdXyJsGnKBs88G8bzgG1HFcVED4-rYi1n8zAC3zKBah3RhiVcSDafKFSsiYkJe-FvNzZefw4nMDHYHwng4pvAiT0ESlpc';
  mifoto:any=this.icoFot;
  datos:any={
    "titulo":"",
    "descripcion":"",
    "precio":"",
    "tipo_cobro":"",
    "categoria":{
      "id":"",
      "color":"",
      "imagen":"",
      "nombre":""
    },
    "ultimas_resenas":[]
  };
  urlImagen:Observable<string>;

  ngOnInit() {
    this.login();
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


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccione',
      cssClass: 'my-custom-class',
      buttons: [ {
        text: 'Cámara',
        icon: 'camera-outline',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: 'Galeria',
        icon: 'image-outline',
        handler: () => {
          this.getPhoto()
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  //image picker
async takePhoto(){
  try {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
    }
    
    const result=await this.camera.getPicture(options)
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const id=Math.random().toString(36).substring(2);
     this.mifoto =  'data:image/jpeg;base64,' +result;
     const pictures= this.storage.ref(`servicios/${id}`);
     const tarea= pictures.putString(this.mifoto,'data_url');

     tarea.snapshotChanges().pipe(finalize(()=>this.urlImagen=pictures.getDownloadURL()))
     .subscribe();

  } catch (error) {
    alert('Error al subir foto con la camara '+error);
  }
  

}

async getPhoto(){
  try {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType:this.camera.EncodingType.JPEG,
      saveToPhotoAlbum:false,
      mediaType:this.camera.MediaType.PICTURE,
      correctOrientation:true
    }
    
    const result=await this.camera.getPicture(options)
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     const id=Math.random().toString(36).substring(2);
     this.mifoto =  'data:image/jpeg;base64,' +result;
     const pictures= this.storage.ref(`servicios/${id}`);
     const tarea= pictures.putString(this.mifoto,'data_url');

     tarea.snapshotChanges().pipe(finalize(()=>this.urlImagen=pictures.getDownloadURL()))
     .subscribe();

     

  } catch (error) {
   alert(error+"Al subir la foto escogiendo");
  } 

  
}

//Categoria botones
btnCategoria(id){
  console.log(id);
}
//ion select
async onChange(id){
  
  await this.db.doc('categorias/'+this.datos.categoria.id.trim())
  .ref.get().then(doc=>{
      if (doc.exists) {
        console.log(doc.data());
        this.datos.categoria.color=doc.data().color.trim();
        this.datos.categoria.imagen=doc.data().imagen.trim();
        this.datos.categoria.nombre=doc.data().nombre.trim();
      } else {
        alert("Categoría no encontrada");
      }
    }).catch(err=>{
      alert(err);
    })
 
}
async login(){
  let usuario= await this.afAuth.auth.currentUser.uid;
  this.datos.usuario_id=usuario;
  console.log(this.afAuth.auth.currentUser);
}
//Enviar datos
submit(){
  
  //falta llenar los demas campos
this.datos.calificacion=0;
this.datos.numero_solicitudes=0;
this.datos.imagen=this.inputImageURL.nativeElement.value.trim();
this.datos.punto_geografico = new firebase.firestore.GeoPoint(this.lat, this.long);

console.log(this.datos.categoria.id);
//let servcio = new Servicio();
//TODO: Arreglar los campos de validacion y retorno a explorer, tamaño de las imagnes poner snck bar
if(this.datos.categoria.id==""){
  alert('Seccione una categoria');
}else if(this.datos.imagen==""||this.datos.titulo==""||this.datos.descripcion==""||this.datos.precio==""||
this.datos.tipo_cobro==""){
  alert('Llene todos los datos');
}else{
  
  console.log(this.datos);
  this.db.collection('servicios').add(this.datos);
  this.msServicioSave();
  //this.regreso="/explorar";
}
/*

punto_geografico: [lat,lon]


*/
}

//Metodo del toast

async msServicioSave() {
  const toast = await this.toastController.create({
    message: 'Servicio guardado',
    duration: 4000,
    buttons: [
      {
        side: 'start',
        icon: 'checkmark-outline',
        text: 'Hecho',
        handler: () => {
          console.log('Favorite clicked');
        }
      }]
  }
  );
  toast.present();
}
}
