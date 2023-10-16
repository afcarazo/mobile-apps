import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loading : boolean = false;
  logeado : any;
  constructor(private auth: AngularFireAuth) { }

  resetPassword({ email }: any): Promise<void> {
    try {
      return this.auth.sendPasswordResetEmail( email);
    } catch (error) {
      return null;
    }
  }
  async register({ email, password }: any) {
    try {
      
      const user = await this.auth.createUserWithEmailAndPassword( email, password);
      return user;
    } catch (error) {
      return null;
    }
  }
  async login({ email, password }: any) {
    try {
      let perfil : string = "";

    if(email == "admin@admin.com")
    {
      perfil = "admin";
    }

    this.loading = true;
      const user = await this.auth.signInWithEmailAndPassword( email, password);
      this.logeado = {
        email : email,
        password : password,
        perfil : perfil
      }
      return user;
    } catch (error) {
      return null;
    }
  }
  logout() {
    return this.auth.signOut();
  }
  /*async googleLogin()
  {
    try {
      return this.auth.signInWithPopup(new GoogleAuthProvider);
    } catch (error) {
      return null;
    }
  }*/
}
