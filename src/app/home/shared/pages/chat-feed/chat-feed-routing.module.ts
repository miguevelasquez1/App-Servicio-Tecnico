import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatFeedPage } from './chat-feed.page';

const routes: Routes = [
  {
    path: '',
    component: ChatFeedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatFeedPageRoutingModule {}
