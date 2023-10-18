import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-splash-animado',
  templateUrl: './splash-animado.page.html',
  styleUrls: ['./splash-animado.page.scss'],
})
export class SplashAnimadoPage implements OnInit {

  constructor(private router: Router, private platform:Platform) { 
    this.initializeApp();
  }

  ngOnInit() 
  {
    setTimeout(() => {
      this.router.navigateByUrl("login");
    }, 3000);
  }
  initializeApp() {
    this.platform.ready().then(() => { 
      SplashScreen.hide();
    })
   }
}
