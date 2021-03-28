import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventarioFormPageRoutingModule } from './inventario-form-routing.module';

import { InventarioFormPage } from './inventario-form.page';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormComponent } from './components/form/form.component';

@NgModule({
  imports: [
    AngularFireStorageModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    InventarioFormPageRoutingModule
  ],
  declarations: [FormComponent, InventarioFormPage]
})
export class InventarioFormPageModule {}
