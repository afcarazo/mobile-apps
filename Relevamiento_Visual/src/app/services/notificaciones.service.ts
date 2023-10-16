import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(   public toastController: ToastController) { }
 
 
  async showAlertError(header,message)
  { 

    const toast = await this.toastController.create
    ({
      message: message,
      header: header,
      duration: 2000,
      position: 'top',
      color: 'danger',
      icon:'close-circle-outline'

    });
    toast.present();

  }
}
