import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RutasListPage } from './rutas-list.page';

const routes: Routes = [
  {
    path: '',
    component: RutasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutasListPageRoutingModule {}
