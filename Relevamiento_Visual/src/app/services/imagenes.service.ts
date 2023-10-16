import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirestoreService } from './firestore.service';
import { getStorage, ref, uploadString } from "firebase/storage";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import * as moment from 'moment';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  userEmail: any;
  constructor(private authService: AuthService, private firestoreStorage: AngularFireStorage, private firestore: FirestoreService, private loadingController:LoadingController) { 
    this.userEmail = this.authService.email;
  }

  public async agregarFotoGaleria(foto: any, tema:any) {
    const fotoCapturada = await Camera.getPhoto(
      {
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 100,
        webUseInput: true
      });
    
    let storage = getStorage();
    let date = new Date().getTime();
    let nombre = `${this.userEmail} ${date}`;


    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    foto.hora = fecha;
    
    let storageReferencia = ref(storage, nombre);
    let url = this.firestoreStorage.ref(nombre);

    uploadString(storageReferencia, fotoCapturada.dataUrl, 'data_url').then(async () => {
      const loading = await this.loadingController.create();
      await loading.present();
      url.getDownloadURL().subscribe((url1: any) => {
        foto.pathFoto = url1;
        this.firestore.guardarFoto(foto, tema);
      })
      await loading.dismiss();

    });
  }
}
