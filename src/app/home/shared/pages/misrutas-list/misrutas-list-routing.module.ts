import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisrutasListPage } from './misrutas-list.page';

const routes: Routes = [
  {
    path: '',
    component: MisrutasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisrutasListPageRoutingModule {}
