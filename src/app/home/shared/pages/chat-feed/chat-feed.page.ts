import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ChatService } from '../../../../services/chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chat } from 'src/app/models/chat';
// import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.page.html',
  styleUrls: ['./chat-feed.page.scss'],
})
export class ChatFeedPage implements OnInit {

  listChat: Chat[];

  chatKey = 'buena el payaso';
  chats;
  name;
  email;
  photoUrl;
  currentUser;
  currentUserName;
  userUid;
  // messagesJson = this.domesticosComponent.

  constructor(
    public chatService: ChatService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.getCurrentUser();

    this.chatService.getChat().subscribe(actionArray => {
      this.listChat = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Chat
        };
      });
    });
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      this.name = auth.displayName;
      this.email = auth.email;
      this.photoUrl = auth.photoURL;

      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(user => {
          this.currentUser = user.uid;
          this.currentUserName = user.name;
        });
      }
    });
  }

}
