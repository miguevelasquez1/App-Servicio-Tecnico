import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'rutas',
        children: [
          {
            path: '',
            loadChildren: () => import('./shared/pages/misrutas-list/misrutas-list.module').then( m => m.MisrutasListPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'rutas-form',
        children: [
          {
            path: '',
            loadChildren: () => import('./shared/pages/rutas-form/rutas-form.module').then( m => m.RutasFormPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('./shared/pages/account/account.module').then( m => m.AccountPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'charts',
        children: [
          {
            path: '',
            loadChildren: () => import('./shared/pages/charts/charts.module').then( m => m.ChartsPageModule),
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: '',
        redirectTo: '/home/account',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
