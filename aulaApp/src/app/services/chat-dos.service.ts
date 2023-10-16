import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chat } from '../clases/chat';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
@Injectable({
  providedIn: 'root'
})
export class ChatDosService {

 
  private itemsCollection: any;
  public chats: Chat[] = [];
  usuario: any;
  constructor(private afs: AngularFirestore, private auth: AuthService,private router:Router) {
    this.usuario = new Usuario();
    this.itemsCollection = this.afs.collection<Chat>('chat-pps-4b', ref => ref.orderBy('date', 'desc').limit(10));
  
    this.auth.auth.authState.subscribe(user => {
      console.log('estado', user);
      if (!user)
      {
        return;
      }
      this.usuario.id = user.uid;
      if(user.email)
      this.usuario.name = this.auth.getName(user.email);
     })
    }
  
  cargarMensajes() {
    
    return this.itemsCollection.valueChanges().subscribe((mensajes) => {
      if (mensajes !== null) {
        this.chats = mensajes;
        this.chats = [];
        for (let mensaje of mensajes) {
         this.chats.unshift(mensaje);
          
        }
      }
      return this.chats;
    });

  }

  agregarMensaje(texto:string)
  { 
    let date = new Date();
    const fecha = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');
    console.log(this.usuario);
    let mensaje: Chat =
    {
      name: this.usuario.name,
      message: texto,
      date: fecha,
      uid:this.usuario.id

    }
    console.log(mensaje);
    return this.itemsCollection.add(mensaje);
  }
}
