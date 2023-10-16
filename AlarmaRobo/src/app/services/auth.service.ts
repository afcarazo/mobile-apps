import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loading : boolean = false;
  logeado: any;
  password: any;
  constructor(public auth : AngularFireAuth, public router : Router, private toastController : ToastController) { }

  async login({ email, password }: any) {
    try {
      const user = await this.auth.signInWithEmailAndPassword(email, password);
      this.password = password;
      return user;
    } catch (error) {
      return null;
    }
  }

  logout() {
    return this.auth.signOut();
  }
}
