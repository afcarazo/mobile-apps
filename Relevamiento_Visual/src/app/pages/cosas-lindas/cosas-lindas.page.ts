import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { IonContent, LoadingController} from '@ionic/angular';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  listadoCosasLindas: any[]=[];
  foto: any;
  userEmail: any;
  constructor(private firstore: FirestoreService,private camera:Camera, private authService: AuthService, private imageStorage: ImagenesService,
    private loadingController: LoadingController, private notificaciones:NotificacionesService, private router:Router) { 
    this.userEmail = this.authService.email;
  }
  scrollToTop() {
    this.content.scrollToTop(300);
  }
  async ngOnInit() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.firstore.traerListaCosasLindas().subscribe(async cosasLindas => { 
      await loading.present();
      this.listadoCosasLindas = [];
      if (cosasLindas != null && cosasLindas.length>0) {

        cosasLindas.forEach( async (element:any) => {
          this.listadoCosasLindas.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
        await loading.dismiss();

       }
    })
  }
  setLike(foto: any) {
    foto.likes.push(this.userEmail);
    this.firstore.modificarFoto(foto.id,foto,1);
  }


  busquedaLike(foto:any):boolean
  {
    let retorno = false;
    if (!(foto.likes === '[]')) {
      foto.likes.forEach(element => {
        if (element.likes == this.userEmail) {
          retorno = true;
        }
      });
    }
    return retorno;
   }

  async subirFoto()
  {
    let hora = new Date();
  
    let foto : any = {
      pathFoto : "",
      email : this.userEmail,
      hora : hora.getFullYear(),
      likes : []
    } 
    const loading = await this.loadingController.create();
    await loading.present();

    this.imageStorage.agregarFotoGaleria(foto, 1)
    await loading.dismiss();
    this.scrollToTop();  
    
  }
  async sacarFoto() { 
    try 
    {
      const foto : CameraOptions = {
      quality: 100,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : true,
      correctOrientation : true
      }     
      const loading = await this.loadingController.create();
    await loading.present();
    const result = await this.camera.getPicture(foto);
    this.imageStorage.agregarFotoGaleria(foto, 1)
    await loading.dismiss();
    this.scrollToTop(); 

    }
    catch (error) 
    {
      alert(error);
    }
  }
  error() { 
    this.notificaciones.showAlertError('ERROR','Ya le diste me gusta a esta foto!');
  }
  navegarGrafico() { 
    this.router.navigateByUrl('graficosLindas');
  }
}
