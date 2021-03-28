import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { IonicModule } from '@ionic/angular';

import { ServiciosPageRoutingModule } from './servicios-routing.module';

import { ServiciosPage } from './servicios.page';
import { DomesticosComponent } from './domesticos/domesticos.component';
import { ComercialesComponent } from './comerciales/comerciales.component';
import { IndustrialesComponent } from './industriales/industriales.component';
import { CardServiceComponent } from './components/card-service/card-service.component';
import { HomePageModule } from 'src/app/home/home.module';

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
    HomePageModule
  ]
})
export class ServiciosPageModule {}
