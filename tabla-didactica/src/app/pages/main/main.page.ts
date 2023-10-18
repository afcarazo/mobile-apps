import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Router } from '@angular/router';
import { EnumTipoIdioma, EnumTipoJuego, Idioma } from 'src/app/clases/idioma';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public controlador: Idioma;
  public tipoJuego: string;

  constructor(private authService: AuthService, private router: Router, private screenOrientation: ScreenOrientation) {
    this.controlador = new Idioma();
  }

  ngOnInit() {
    console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'



    // allow user rotate
    this.screenOrientation.unlock();

    // detect orientation changes
    this.screenOrientation.onChange().subscribe(
      () => {
        this.router.navigateByUrl('rotation');

      }
    );

  }

  public ReproducirSonido(pathSonido: string) {

    let audio = new Audio();
    audio.src = pathSonido;

    audio.load();
    audio.play();
  }
  async logout() {
    await this.authService.logout()
      .then(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      })
      .catch(error => console.log(error));
  }

  public cambiarIdioma(idioma: string) {
    switch (idioma) {
      case 'español':
        this.controlador.idiomaEspañol();
        break;

      case 'ingles':
        this.controlador.idiomaIngles();
        break;

      case 'portugues':
        this.controlador.idiomaPortugues();
        break;
    }

  }

  public cambiarTematica(juego: string) {
    switch (juego) {
      case "animales":
        this.controlador.tipoJuego = EnumTipoJuego.animales;
        break;
      case "numero":
        this.controlador.tipoJuego = EnumTipoJuego.numero;
        break;
      case "color":
        this.controlador.tipoJuego = EnumTipoJuego.color;
        break;
    }
    this.cambiarIdioma(EnumTipoIdioma[this.controlador.idiomaActual]);

  }

}

