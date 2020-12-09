import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatformPageRoutingModule } from './platform-routing.module';

import { PlatformPage } from './platform.page';
import { RegistroComponent } from './shared/components/registro/registro.component';
import { RegistroListComponent } from './shared/components/registro-list/registro-list.component';
// import { LayoutComponent } from './shared/components/layout/layout.component';
import { HeaderComponent } from './shared/components/header/header.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ReversePipe } from './shared/pipes/reverse.pipe';
import { ServiciosPage } from '../home/shared/pages/servicios/servicios.page';
import { LayoutComponent } from './shared/components/layout/layout.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatformPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    LayoutComponent,
    RegistroListComponent,
    RegistroComponent,
    LayoutComponent,
    PlatformPage,
    FilterPipe,
    ReversePipe],
  providers: [LayoutComponent, RegistroComponent]
})
export class PlatformPageModule {}
