import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import * as Hammer from 'hammerjs';
import { HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { ServiciosPageRoutingModule } from './servicios-routing.module';

import { ServiciosPage } from './servicios.page';
import { DomesticosComponent } from './domesticos/domesticos.component';
import { ComercialesComponent } from './comerciales/comerciales.component';
import { IndustrialesComponent } from './industriales/industriales.component';
import { CardServiceComponent } from './components/card-service/card-service.component';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosPageRoutingModule
  ],
  declarations: [
    CardServiceComponent,
    IndustrialesComponent,
    ComercialesComponent,
    DomesticosComponent,
    ServiciosPage
  ],
  providers: [
  ]
})
export class ServiciosPageModule {}
