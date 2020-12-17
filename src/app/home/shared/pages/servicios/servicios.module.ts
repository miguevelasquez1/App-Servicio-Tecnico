import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { ServiciosPageRoutingModule } from './servicios-routing.module';

import { ServiciosPage } from './servicios.page';
import { DomesticosComponent } from './domesticos/domesticos.component';
import { ComercialesComponent } from './comerciales/comerciales.component';
import { IndustrialesComponent } from './industriales/industriales.component';
import { LayoutComponent } from 'src/app/home/shared/components/layout/layout.component';
import { LayoutModule } from 'src/app/home/shared/components/layout/layout.module';
import { HomePage } from '../../../home.page';
import { HomePageModule } from '../../../home.module';
import { ChatFeedPage } from '../chat-feed/chat-feed.page';
import { ChatFeedPageModule } from '../chat-feed/chat-feed.module';

import { FCM } from '@capacitor-community/fcm';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ServiciosPageRoutingModule
  ],
  declarations: [
    IndustrialesComponent,
    ComercialesComponent,
    DomesticosComponent,
    ServiciosPage
  ],
  providers: [
    FCM
  ]
})
export class ServiciosPageModule {}
