import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutasListPageRoutingModule } from './rutas-list-routing.module';

import { RutasListPage } from './rutas-list.page';

import { ReversePipe } from '../../../../platform/shared/pipes/reverse.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RutasListPageRoutingModule
  ],
  declarations: [ReversePipe, RutasListPage]
})
export class RutasListPageModule {}
