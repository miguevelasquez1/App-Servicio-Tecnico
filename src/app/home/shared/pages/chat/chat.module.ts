import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../../../../services/chat.service';
import { ChatFeedPage } from '../chat-feed/chat-feed.page';
import { HomePage } from 'src/app/home/home.page';
import { MessageService } from '../../../../services/message.service';
import { DomesticosComponent } from '../servicios/domesticos/domesticos.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [],
  providers: [ChatFeedPage, DomesticosComponent, MessageService, HomePage, ChatService]
})
export class ChatPageModule {}
