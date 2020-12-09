import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatformPage } from './platform.page';
import { RegistroComponent } from './shared/components/registro/registro.component';
import { RegistroListComponent } from './shared/components/registro-list/registro-list.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { ChatPage } from '../home/shared/pages/chat/chat.page';

const routes: Routes = [
  {
    path: '',
    component: PlatformPage,
    children: [
      {
        path: 'registro',
        component: RegistroComponent
      },
      {
        path: 'registro-list',
        component: RegistroListComponent
      },
      {
        path: 'inventario',
        loadChildren: () => import('./inventario/inventario.module').then( m => m.InventarioPageModule)
      },
      {
        path: 'chat',
        component: ChatPage
      },
      {
        path: '',
        redirectTo: '/platform/registro-list',
        pathMatch: 'full'
      }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformPageRoutingModule {}
