import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen'


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  
  constructor(private router: Router, private platform:Platform) { 
    this.initializeApp();
  }

  ngOnInit() 
  {
    setTimeout(() => {
      this.router.navigateByUrl("login");
    }, 3500);
  }
  initializeApp() {
    this.platform.ready().then(() => { 
      SplashScreen.hide();
    })
   }

}
