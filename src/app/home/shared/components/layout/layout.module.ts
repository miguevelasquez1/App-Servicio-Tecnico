import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ServiciosPage } from '../../pages/servicios/servicios.page';
import { ServiciosPageModule } from '../../pages/servicios/servicios.module';
import { HomePage } from '../../../home.page';
import { HomePageModule } from '../../../home.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  providers: []
})
export class LayoutModule { }
