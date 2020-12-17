import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'servicios',
        children: [
          {
            path: '',
            loadChildren: () => import('./shared/pages/servicios/servicios.module').then(m => m.ServiciosPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/servicios',
        pathMatch: 'full'
      },
      {
        path: 'chat-feed',
        children: [
          {
            path: '',
            loadChildren: () => import('./shared/pages/chat-feed/chat-feed.module').then(m => m.ChatFeedPageModule)
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
