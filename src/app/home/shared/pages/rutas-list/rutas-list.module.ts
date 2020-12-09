import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutasListPageRoutingModule } from './rutas-list-routing.module';

import { RutasListPage } from './rutas-list.page';

import { FilterPipe } from '../../../../platform/shared/pipes/filter.pipe';
import { ReversePipe } from '../../../../platform/shared/pipes/reverse.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RutasListPageRoutingModule
  ],
  declarations: [ReversePipe, FilterPipe, RutasListPage]
})
export class RutasListPageModule {}
