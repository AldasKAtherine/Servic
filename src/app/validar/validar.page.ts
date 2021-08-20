import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
@Component({
  selector: 'app-validar',
  templateUrl: './validar.page.html',
  styleUrls: ['./validar.page.scss'],
})
export class ValidarPage implements OnInit {
  window: any;
  codigo;
  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore) { }
  ngOnInit() {

  }
  verificarCodigo(codigo: string) {
    let nose = firebase.auth.PhoneAuthProvider.credential(codigo, codigo);
    console.log(nose);
  }
}
