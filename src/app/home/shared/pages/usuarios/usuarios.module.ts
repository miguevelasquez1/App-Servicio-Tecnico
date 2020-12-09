import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';

import { FilterPipe } from '../../../../platform/shared/pipes/filter.pipe';
import { ReversePipe } from '../../../../platform/shared/pipes/reverse.pipe';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule
  ],
  declarations: [FilterPipe, ReversePipe, UsuariosPage]
})
export class UsuariosPageModule {}
