import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.page.html',
  styleUrls: ['./mis-fotos.page.scss'],
})
export class MisFotosPage implements OnInit {

  spinner:boolean=true;
  public fotosLindas;
  public fotosFeas;
  public misFotosLindas:any=new Array<any>();
  public misFotosFeas:any=new Array<any>();

  constructor(public authService: AuthService, public firestore:AngularFirestore, private loadingController:LoadingController) 
  { 

    
  }

  async ngOnInit() 
  {
    this.fotosLindas = this.firestore.collection("cosas-lindas", ref => ref.where('email', '==', this.authService.email)).snapshotChanges();
    this.fotosFeas = this.firestore.collection("cosas-feas", ref => ref.where('email', '==', this.authService.email)).snapshotChanges();
    await this.cargarFotosLindas();
    await this.cargarFotosFeas();
  }
  cargarFotosLindas(){

    this.fotosLindas.pipe(
      map((data: any) => {
        this.misFotosLindas = new Array<Foto>();
        data.map((foto: any) =>{
          var fotoCargada: Foto= new Foto();
          fotoCargada.imagen = foto.payload.doc.data().pathFoto;
          fotoCargada.votos = foto.payload.doc.data().likes.length;
          fotoCargada.usuarioEmail = foto.payload.doc.data().email;
          fotoCargada.fecha = foto.payload.doc.data().hora;
          fotoCargada.usuariosQueVotaron = foto.payload.doc.data().likes;
          fotoCargada.id = foto.payload.doc.id;
          this.misFotosLindas.push(fotoCargada);
                    
        })
      })
    ).subscribe((datos: any) => {
      
    });
  }
  
  cargarFotosFeas(){
  
    this.fotosFeas.pipe(
      map((data: any) => {
        this.misFotosFeas = new Array<Foto>();
        data.map((foto: any) =>{
          var fotoCargada: Foto= new Foto();
          fotoCargada.imagen = foto.payload.doc.data().pathFoto;
          fotoCargada.votos = foto.payload.doc.data().likes.length;
          fotoCargada.usuarioEmail = foto.payload.doc.data().email;
          fotoCargada.fecha = foto.payload.doc.data().hora;
          fotoCargada.usuariosQueVotaron = foto.payload.doc.data().likes;
          fotoCargada.id = foto.payload.doc.id;
          this.misFotosFeas.push(fotoCargada);
                    
                    
        })
      })
    ).subscribe((datos: any) => {
      console.log(datos);
      
    });
  }
  
  changeSpinner(){
    console.log(this.spinner);
    this.spinner=false;
    console.log(this.spinner);
   }
  }
  
  export class Foto{
    imagen: string;
    fecha: string;
    votos:number;
    usuarioEmail:string;
    id:string;
    usuariosQueVotaron:string;
  }