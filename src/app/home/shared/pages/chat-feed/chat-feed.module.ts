import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatFeedPageRoutingModule } from './chat-feed-routing.module';

import { ChatFeedPage } from './chat-feed.page';
import { DomesticosComponent } from '../servicios/domesticos/domesticos.component';
import { HomePage } from 'src/app/home/home.page';
import { MessageService } from '../../../../services/message.service';
import { ChatPage } from '../chat/chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatFeedPageRoutingModule
  ],
  declarations: [ChatFeedPage],
  providers: [DomesticosComponent, HomePage, ChatPage, MessageService, ChatFeedPage]
})
export class ChatFeedPageModule {}
