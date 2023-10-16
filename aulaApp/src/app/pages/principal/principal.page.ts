import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit() {
  }
  navegarChatUno()
  {
    this.router.navigateByUrl('chat');
   }
   salir()
   {
     this.auth.logout();
     this.router.navigateByUrl('login');
    }
  navegarChatDos() { 
    
    this.router.navigateByUrl('chat-dos');
  }
}
