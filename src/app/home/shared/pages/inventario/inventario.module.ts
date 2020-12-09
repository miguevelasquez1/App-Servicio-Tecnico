import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioPageRoutingModule } from './inventario-routing.module';

import { InventarioPage } from './inventario.page';

import { FilterPipe } from '../../../../platform/shared/pipes/filter.pipe';
import { ReversePipe } from '../../../../platform/shared/pipes/reverse.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioPageRoutingModule
  ],
  declarations: [ReversePipe, FilterPipe, InventarioPage]
})
export class InventarioPageModule {}
