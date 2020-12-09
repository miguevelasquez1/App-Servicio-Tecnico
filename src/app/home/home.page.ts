import { Component } from '@angular/core';
// import { AuthService } from 'src/servicios/auth.service';
// import { ChatService } from 'src/servicios/chat.service';
import { MenuController } from '@ionic/angular';
// import { Chat } from '../models/chat';
// import { ChatFeedPage } from './shared/pages/chat-feed/chat-feed.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  showPrincipal = true;
  showDomesticos = false;
  showComerciales = false;
  showIndustriales = false;

  miniChat = false;

  chatKey = 'no te funciono cruck';

  constructor(
    // private chatService: ChatService,
    private menu: MenuController,
    // private authService: AuthService
  ) { }


  // onSubmitSignOut() {
  //   this.authService.signOut()
  //   this.menu.close('first');
  // }

  onSubmit() {
    this.menu.close('first');
  }

  onSubmitDomestico() {
    this.menu.close('first');
    this.showPrincipal = false;
    this.showDomesticos = true;
    this.showComerciales = false;
    this.showIndustriales = false;
  }

  onSubmitComercial() {
    this.menu.close('first');
    this.showPrincipal = false;
    this.showDomesticos = false;
    this.showComerciales = true;
    this.showIndustriales = false;
  }

  onSubmitIndustrial() {
    this.menu.close('first');
    this.showPrincipal = false;
    this.showDomesticos = false;
    this.showComerciales = false;
    this.showIndustriales = true;
  }

  onSubmitPrincipal() {
    this.menu.close('first');
    this.showPrincipal = true;
    this.showDomesticos = false;
    this.showComerciales = false;
    this.showIndustriales = false;
  }

  // newChat() {
  //   this.miniChat = true;
  //   if (this.chatService.chatForm.get('$key').value == null) {
  //     this.chatService.addChat(this.chatService.chatForm.value);
  //     console.log(this.chatService.chatForm.value);
  //   }
  //   console.log(this.miniChat);
  // }

  // onSubmitKeyChat(chat: Chat) {
  //   this.chatKey = chat.id;
  //   console.log(this.chatKey);
  // }

}


