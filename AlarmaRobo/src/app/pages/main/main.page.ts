import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  form: FormGroup;
  contraseña: string = "admin123";
  activada: boolean = false;
  apagar: boolean = true;
  cont: any;

  //Variables
  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;
  subscription: any;


  audioIzquierda = "../../../assets/sonidos/izquierda.mp3";
  audioDerecha = "../../../assets/sonidos/derecha.mp3";
  audioVertical = "../../../assets/sonidos/vertical.mp3";
  audioHorizontal = "../../../assets/sonidos/horizontal.mp3";
  audio = new Audio();

  primerIngreso: boolean = true;
  primerIngresoFlash: boolean = true;

  posicionActualCelular = 'actual';
  posicionAnteriorCelular = 'anterior';
  ClaveErroreas = 0;

  constructor(private formBuilder: FormBuilder,
    public as: AuthService,
    private toastController: ToastController,
    private flashlight: Flashlight,
    private vibration: Vibration,
    private screenOrientation: ScreenOrientation,
    private router: Router,
    private deviceMotion: DeviceMotion) {
    this.form = this.formBuilder.group({
      'password': ['', [Validators.required]],
    });
  }
  async showAlert(header, message) {

    const toast = await this.toastController.create
      ({
        message: message,
        header: header,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
        icon: 'close-circle-outline'

      });
    toast.present();
  }
  ngOnInit() {
  }

  logOut() {
    this.as.logout();
  }

  encenderAlarma() {
    this.activada = true;
    this.comenzar();
  }

  apagarAlarma() {
    console.log(this.cont);
    console.log(this.as.password);
    if (this.cont == this.as.password) {
      console.log('estoy aca');
      this.ClaveErroreas = 0;
      this.activada = false;
      this.MostrarToastApagada('Alarma desactivada!').then((toast: any) => {
        toast.present();
        this.cont = '';
      });
      this.form.reset();
      this.subscription.unsubscribe();
      this.primerIngreso = true;
      this.audio.pause();
    }
    else {
      this.MostrarToast('La contraseña es incorrecta!!').then((toast: any) => {
        toast.present();
        this.audio.src = this.audioIzquierda;
        this.vibration.vibrate(4000);
        this.audio.play();
        this.movimientoVertical();
      });
    }
  }
  navegarALogin() {
    this.as.logout()
    this.router.navigateByUrl('login');
   }

  MostrarToast(message: string) {
    return this.toastController.create({
      header: 'ERROR',
      message: message,
      duration:2000,
      position: 'top',
      color: "danger"
    });
  }

  MostrarToastApagada(message: string) {
    return this.toastController.create({
      header: 'Desactivada',
      message: message,
      duration:2000,
      position: 'top',
      color: "light"
    });
  }

  comenzar() {
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accelerationX = Math.floor(acceleration.x);
      this.accelerationY = Math.floor(acceleration.y);
      this.accelerationZ = Math.floor(acceleration.z);

      if (acceleration.x > 5) {
        //Inclinacion Izquierda

        this.posicionActualCelular = 'izquierda';
        this.movimientoIzquierda();
      }
      else if (acceleration.x < -5) {
        //Inclinacion Derecha

        this.posicionActualCelular = 'derecha';
        this.movimientoDerecha();
      }
      else if (acceleration.y >= 9) {
        //encender flash por 5 segundos y sonido
        this.posicionActualCelular = 'arriba';

        if ((this.posicionActualCelular != this.posicionAnteriorCelular)) {
          this.audio.src = this.audioVertical;
          this.posicionAnteriorCelular = 'arriba';
        }
        this.audio.play();
        this.movimientoVertical();
      }

      else if (acceleration.z >= 9 && (acceleration.y >= -1 && acceleration.y <= 1) && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //acostado vibrar por 5 segundos y sonido
        this.posicionActualCelular = 'plano';
        this.movimientoHorizontal();
      }


    });
  }

  movimientoIzquierda() {
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'izquierda';
      this.audio.src = this.audioIzquierda;
    }
    this.audio.play();
  }

  movimientoDerecha() {
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'derecha';
      this.audio.src = this.audioDerecha;
    }
    this.audio.play();
  }

  movimientoVertical() {
    if (this.primerIngresoFlash) {
      this.primerIngresoFlash ? this.flashlight.switchOn() : false;
      setTimeout(() => {
        this.primerIngresoFlash = false;
        this.flashlight.switchOff();
      }, 5000);
      this.primerIngreso = false;
    }
  }

  movimientoHorizontal() {
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'plano';
      this.audio.src = this.audioHorizontal;
    }

    this.primerIngreso ? null : this.audio.play();
    this.primerIngreso ? null : this.vibration.vibrate(5000);
    this.primerIngreso = true;
    this.primerIngresoFlash = true;
  }

}

