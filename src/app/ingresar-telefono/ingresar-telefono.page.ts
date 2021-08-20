import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { NavController, AlertController } from '@ionic/angular';
import { ValidarPage } from '../validar/validar.page';
import { async } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { Usuario } from '../usuario';
interface chat{
  uid : number
}
@Component({
  selector: 'app-ingresar-telefono',
  templateUrl: './ingresar-telefono.page.html',
  styleUrls: ['./ingresar-telefono.page.scss'],
})
export class IngresarTelefonoPage implements OnInit {
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  window : any;
  qty:any;
  phoneNumber:any;
  public vector: any=[];
  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore, public navCtrl: NavController, public alertController:AlertController, public toastController:ToastController) { 
  }
  
  ngOnInit() {
    this.ionViewDidLoad();
    console.log(this.afFirestore.collection('usuarios').snapshotChanges());
  }
  ionViewDidLoad() {
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
      this.recaptchaVerifier.render().then()
  }

   signIn(phoneNumber: number){
    if(this.qty == undefined){
      phoneNumber = 0;
    }
    
    if(phoneNumber.toString().length == 10){
      const numeroNuevo = phoneNumber.toString().slice(1);
      const appVerifier = this.recaptchaVerifier;
      const phoneNumberString = "+593" + numeroNuevo;
      var self = this;
      var base = this;
      var pru = this;
      var page = this;
      var sms = this;
      console.log(phoneNumberString);
      console.log(appVerifier);
    
       firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
        .then( async(confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log("Enviado...");
          ////////////////////////////////////////////////////////////////////////////
          let prompt = await this.alertController.create({
            header: 'Confirmacion de codigo',
            inputs: [{ name: 'confirmationCode', placeholder: 'Escriba su codigo..' }],
            buttons: [
              { text: 'Cancelar',
                handler: data => { console.log('Cancel clicked'); }
              },
              { text: 'Aceptar',
              handler: data => {
                confirmationResult.confirm(data.confirmationCode)
                .then(function (result) {
                  // User signed in successfully.                  
                  //////////////////////////////////////////////
                  let usu = base.afFirestore.collection('usuarios').snapshotChanges();
                  usu.subscribe(usuarios =>{
                    var dat = "";
                    usuarios.map(usuarios => {
                      if(result.user.uid === usuarios.payload.doc.id){
                         dat = usuarios.payload.doc.id;
                      }
                    })
                    if(dat.length > 0){
                      page.abrirApp();
                    }else{
                      page.abrirRegistrarse();
                    }
                  })
                  //////////////////////////////////////////////            
                    
                }).catch( function (error) {
                  self.presentToast();
                  console.error("ERROR:", error);
                });
              }
              }
            ]
          });
          await prompt.present();
          /////////////////////////////////////////////////////////////////////////////
         
      })
      .catch(function (error) {
        console.error("SMS not sent", error);
        sms.numeroExedido();
      });
    }else{
      console.log("ERROR");
      this.presentAlert();

    }  
  }
  //FIN

  abrirApp() {
    this.navCtrl.navigateBack('/tabs/explorar');
  }
  abrirRegistrarse() {
    this.navCtrl.navigateBack('/registro');
  }
  async presentAlert() {
    
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Advertencia',
      message: 'Ingrese un numero de telefono valido.',
      buttons: ['OK']
    });

    await alert.present();
  }
  async numeroExedido() {
    
    const alert = await this.alertController.create({
      cssClass: 'alertDanger',
      header: 'Aviso',
      message: 'Excedio el número de intentos permitidos, trate nuevamente mas tarde',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Codigo incorrecto',
      duration: 4000
    });
    toast.present();
  }
  obtenerUsuario(uid){
    let usu = this.afFirestore.collection('usuarios').snapshotChanges();
    usu.subscribe(usuarios =>{
      usuarios.map(usuarios => {
        if(uid === usuarios.payload.doc.id){
          const data = usuarios.payload.doc.id;
          this.vector.push(data);
        }
      })
    })
  }


}
