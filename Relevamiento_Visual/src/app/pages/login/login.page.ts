import { Component, OnInit } from '@angular/core';


import { AlertController, LoadingController, Platform } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { randomInt } from 'crypto';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    private authService: AuthService, public alertController: AlertController,
    private loadingController:LoadingController,
    private router: Router,
    public toastController: ToastController
  )
  {

  }
  userUno()
  {
    let email = "admin" + "@admin.com";
    let password = "111111";
    this.formularioLogin.get('email').setValue(email);
    this.formularioLogin.get('password').setValue(password);
  } 
  userDos()
  {
    let email  = "invitado" + "@invitado.com";
    let password = "222222";

    this.formularioLogin.get('email').setValue(email);
    this.formularioLogin.get('password').setValue(password);
  } 
  userTres()
  {
    let email = "anonimo" + "@anonimo.com";
    let password = "444444";
    
    this.formularioLogin.get('email').setValue(email);
    this.formularioLogin.get('password').setValue(password);
  } 

  get email()
  {
    return this.formularioLogin.get('email');
  }
  
  get password()
  {
    return this.formularioLogin.get('password');
  }

  ngOnInit() {

    this.formularioLogin = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]]
    });
  }


  async login()
  {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.formularioLogin.value);
    await loading.dismiss();

      if (user) {
        this.router.navigateByUrl('/principal', { replaceUrl: true });
      }
      else {
        this.showAlert('Correo y/o contraseña inválida.', 'Por favor intente de nuevo!');
      }
    
   }
  async showAlert(header,message)
  { 

    const toast = await this.toastController.create
    ({
      message: message,
      header: header,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
      icon:'close-circle-outline'

    });
    toast.present();

    /*Swal.fire({
      icon: 'error',
      title: header,
      text: message,
      footer: '<a href="">Why do I have this issue?</a>',
      position:'top'
    });*/
/*
    const alert = await this.alertController.create(
      {
        header,
        message,
        buttons: ['OK'],
      }
    );
    await alert.present();*/
  }

}

