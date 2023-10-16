import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  formularioChat: FormGroup;

  constructor(public chatService: ChatService,public fb: FormBuilder, private  router:Router, private auth:AuthService) {
    
    this.chatService.cargarMensajes();
    /*setTimeout(() => {
      this.elemento.scrollTop = this.elemento.scrollHeight;
     },3000)*/

  }
  navegarPrincipal() { 
    this.router.navigateByUrl('principal');
  }
  salir()
  {
    this.auth.logout();
    this.router.navigateByUrl('login');
   }


  ngOnInit() {
    
    this.formularioChat = this.fb.group({
      mensaje:['']
    });
 //this.elemento = document.getElementById('chatbox__messages__user-message');
  }

  mensaje: string = "";
  users: any;
  elemento: any;


  enviar_mensaje()
  { 
    console.log(this.mensaje);
  
    if(this.mensaje.length===0)
    {
      return;
    }
    this.chatService.agregarMensaje(this.mensaje).then(() =>
    this.mensaje = "")
      .catch((error) => console.error('Error al enviar', error));

  }
  

}
