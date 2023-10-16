import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
canActivate} from '@angular/fire/auth-guard';
import { GraficoFeasComponent } from './components/grafico-feas/grafico-feas.component';
import { GraficoLindasComponent } from './components/grafico-lindas/grafico-lindas.component';

const redirectLoggedInToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedIntoHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  },
  {
    path: 'cosas-lindas',
    loadChildren: () => import('./pages/cosas-lindas/cosas-lindas.module').then( m => m.CosasLindasPageModule)
  },
  {
    path: 'cosas-feas',
    loadChildren: () => import('./pages/cosas-feas/cosas-feas.module').then( m => m.CosasFeasPageModule)
  },
  {path: 'graficosLindas', component:GraficoLindasComponent},
  {path: 'graficosFeas', component:GraficoFeasComponent},
  {
    path: 'mis-fotos',
    loadChildren: () => import('./pages/mis-fotos/mis-fotos.module').then( m => m.MisFotosPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
