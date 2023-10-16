import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public router: Router, public authService: AuthService) { }

  ngOnInit() {}

  misFotos()
  {
    this.router.navigate(['mis-fotos']);
  }

  cosasLindas(){
    this.router.navigate(['cosas-lindas']);
  }

  cosasFeas(){
    this.router.navigate(['cosas-feas']);
  }
  graficoLindas()
  {
    this.router.navigate(['graficosLindas']);
  }
  graficoFeas()
  {
    this.router.navigate(['graficosFeas']);
  }
  salir()
  {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}