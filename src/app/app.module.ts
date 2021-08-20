import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { IonHeaderScrollOpacityModule } from "ion-header-scroll-opacity";
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';


// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';


export const firebaseConfig = {
  apiKey: "AIzaSyBcXVmz8hAUjhs7cbpvvmhFXU_eMJA5rC8",
  authDomain: "servic-e3b59.firebaseapp.com",
  databaseURL: "https://servic-e3b59.firebaseio.com",
  projectId: "servic-e3b59",
  storageBucket: "servic-e3b59.appspot.com",
  messagingSenderId: "343131847497",
  appId: "1:343131847497:web:fc7ba0b4c80cfa4218f898",
  measurementId: "G-8H3WX27M2R"
};


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicHeaderParallaxModule, 
    IonHeaderScrollOpacityModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  exports: [IonicHeaderParallaxModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    StatusBar,
    File,
    SplashScreen,
    Camera,
    File,
    Geolocation,
    AngularFireAuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
