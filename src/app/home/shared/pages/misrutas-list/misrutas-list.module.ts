import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisrutasListPageRoutingModule } from './misrutas-list-routing.module';

import { MisrutasListPage } from './misrutas-list.page';

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
    MisrutasListPageRoutingModule
  ],
  declarations: [ReversePipe, MisrutasListPage]
})
export class MisrutasListPageModule {}
