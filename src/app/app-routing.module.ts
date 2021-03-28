
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [LoggedGuard]
  },
  {
    path: 'platform',
    loadChildren: () => import('./platform/platform.module').then( m => m.PlatformPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rutas',
    loadChildren: () => import('./home/shared/pages/rutas-list/rutas-list.module').then( m => m.RutasListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rutas-form',
    loadChildren: () => import('./home/shared/pages/rutas-form/rutas-form.module').then( m => m.RutasFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat-feed',
    loadChildren: () => import('./home/shared/pages/chat-feed/chat-feed.module').then( m => m.ChatFeedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./home/shared/pages/chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pay',
    loadChildren: () => import('./home/shared/pages/pay/pay.module').then( m => m.PayPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventario',
    loadChildren: () => import('./home/shared/pages/inventario/inventario.module').then( m => m.InventarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inventario-form',
    loadChildren: () => import('./home/shared/pages/inventario-form/inventario-form.module').then( m => m.InventarioFormPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./home/shared/pages/usuarios/usuarios.module').then( m => m.UsuariosPageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }