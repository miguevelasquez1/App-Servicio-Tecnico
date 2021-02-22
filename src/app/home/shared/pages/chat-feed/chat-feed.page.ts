import { Component, OnInit } from '@angular/core';
import { DomesticosComponent } from '../servicios/domesticos/domesticos.component';
import { HomePage } from 'src/app/home/home.page';
import { AuthService } from '../../../../services/auth.service';
import { ChatService } from '../../../../services/chat.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Chat } from 'src/app/models/chat';
import { map } from 'rxjs/operators';
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
    private angularFirestore: AngularFirestore,
    public chatService: ChatService,
    private authService: AuthService,
    public domesticosComponent: DomesticosComponent
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
  //  this.chatsCollection = this.angularFirestore.collection<Chat>('chats');
  //  this.chats = this.chatsCollection.snapshotChanges().pipe(
  //    map(actions => {
  //      return actions.map(a => {
  //        const data = a.payload.doc.data() as Chat;
  //        const id = a.payload.doc.id;
  //        return {id, ...data};
  //      });
  //    }));

  }

  // startChat(chat: Chat) {
  //   console.log(chat.id);
  //   this.chatKey = chat.id;
  //   console.log('renombre', this.chatKey);
  // }

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
