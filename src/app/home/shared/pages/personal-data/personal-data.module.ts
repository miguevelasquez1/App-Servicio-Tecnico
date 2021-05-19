import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalDataPageRoutingModule } from './personal-data-routing.module';

import { PersonalDataPage } from './personal-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PersonalDataPageRoutingModule
  ],
  declarations: [PersonalDataPage]
})
export class PersonalDataPageModule {}
