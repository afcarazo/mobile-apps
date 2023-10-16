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
  email: any;
  password: any;
  constructor(public auth : AngularFireAuth, public router : Router, private toastController : ToastController) { }

  getCurrentUser()
  { 
    return this.auth.authState;
 }
  async login({ email, password }: any) {
    try {
      const user = await this.auth.signInWithEmailAndPassword(email, password);
      this.email = email;
      return user;
    } catch (error) {
      return null;
    }
  }

  logout() {
    return this.auth.signOut();
  }
  getName(email:string):string
  {
    let name = '';
    for (let index = 0; index < email.length; index++) {
      if (email[index] != "@") {
        if (index == 0) {
          name += email[index].toUpperCase();
        } else
        {
          name += email[index];

        }
      }
      else { 
        break;
      }
    }
    return name;
   }
}
