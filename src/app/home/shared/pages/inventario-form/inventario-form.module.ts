import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioFormPageRoutingModule } from './inventario-form-routing.module';

import { InventarioFormPage } from './inventario-form.page';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  imports: [
    AngularFireStorageModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioFormPageRoutingModule
  ],
  declarations: [InventarioFormPage]
})
export class InventarioFormPageModule {}
