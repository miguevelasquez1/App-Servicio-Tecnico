import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RutasFormPageRoutingModule } from './rutas-form-routing.module';
import { RutasFormPage } from './rutas-form.page';

import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
    GooglePlaceModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RutasFormPageRoutingModule
  ],
  declarations: [RutasFormPage]
})
export class RutasFormPageModule {}
