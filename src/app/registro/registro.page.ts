import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { map, finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  myphoto:any='https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/600px-Missing_avatar.svg.png';
  ccia:any;
  public NombreApellido;
  public Email;
  public Resena;
  urlImagen:Observable<string> = null;
  constructor(public navCtrl: NavController, private camera:Camera,public actionSheetController: ActionSheetController,private afAuth: AngularFireAuth, private afFirestore: AngularFirestore,public toastController:ToastController, private storage:AngularFireStorage) { }
  currentUser = firebase.auth().currentUser.uid;
  Telefono = firebase.auth().currentUser.phoneNumber;
  @ViewChild('imageServURL') inputImageURL: ElementRef;
  ngOnInit() {
    
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
     this.myphoto =  'data:image/jpeg;base64,' +result;
     const pictures= this.storage.ref(`perfiles/${id}`);
     const tarea= pictures.putString(this.myphoto,'data_url');

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
     this.myphoto =  'data:image/jpeg;base64,' +result;
     const pictures= this.storage.ref(`perfiles/${id}`);
     const tarea= pictures.putString(this.myphoto,'data_url');

     tarea.snapshotChanges().pipe(finalize(()=>this.urlImagen=pictures.getDownloadURL()))
     .subscribe();
  } catch (error) {
   console.log(error+"Al subir la foto escogiendo");
  }

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
async crearUsua(){
  console.log(this.currentUser);
 console.log(this.NombreApellido);
 console.log(this.Email);
 console.log(this.Resena);
 console.log(this.Telefono);
 console.log(this.inputImageURL.nativeElement.value.trim());
 if(this.NombreApellido === undefined){
    this.smsNombre();
     return;
 }else if(this.Email === undefined){
  this.smsCorreo();
    return;
 }else if(this.Resena === undefined){
  this.smsBiografia();
    return;
  }else if(await this.inputImageURL.nativeElement.value.trim() === ""){
    this.foto();
      return;   
 }else{
  this.afFirestore.collection('usuarios').doc(this.currentUser).set({
    biografia: this.Resena,
    email: this.Email,
    id: this.currentUser,
    imagen_perfil: this.inputImageURL.nativeElement.value.trim(),
    nombre: this.NombreApellido,
    numero_contrat: 0,
    numero_resenas: 0,
    numero_telefono: this.Telefono
});
 }


}
async smsBiografia() {
  const toast = await this.toastController.create({
    message: 'Ingrese su biografia',
    duration: 4000
  });
  toast.present();
}
async smsNombre() {
  const toast = await this.toastController.create({
    message: 'Ingrese su nombre y apellido',
    duration: 4000
  });
  toast.present();
}
async smsCorreo() {
  const toast = await this.toastController.create({
    message: 'Ingrese su correo electronico',
    duration: 4000
  });
  toast.present();
}
async foto() {
  const toast = await this.toastController.create({
    message: 'Ingrese una foto de usuario.',
    duration: 4000
  });
  toast.present();
}
}
