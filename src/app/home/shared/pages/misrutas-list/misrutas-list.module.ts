import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisrutasListPageRoutingModule } from './misrutas-list-routing.module';

import { MisrutasListPage } from './misrutas-list.page';

import { FilterPipe } from '../../../../platform/shared/pipes/filter.pipe';
import { ReversePipe } from '../../../../platform/shared/pipes/reverse.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisrutasListPageRoutingModule
  ],
  declarations: [ReversePipe, FilterPipe, MisrutasListPage]
})
export class MisrutasListPageModule {}
